import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { log } from 'node:console';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables);

export interface FeedbackData {
  [month: string]: {
    positive?: number;
    negative?: number;
    neutral?: number;
  };
}

@Component({
  selector: 'app-admin-dashbaord',
  standalone: true,
  imports: [AdminHeaderComponent, FormsModule],
  templateUrl: './admin-dashbaord.component.html',
  styleUrl: './admin-dashbaord.component.css',
})
export class AdminDashbaordComponent implements OnInit {
  constructor(private http: HttpClient) {}
  totalusers: any;
  usermonthly: any;
  months1: any = [];
  counts: any = [];
  slotusermonthly: any;
  slotmonths: any = [];
  slotcounts: any = [];
  last30: any;
  brandsdata: any;
  brands: any = [];
  showroomcount: any;
  config3: any;
  config: any;
  config2: any;
  bcounts: number[] = [];
  ngOnInit(): void {
    this.chart4 = new Chart('Chart4', this.config4);

    this.http
      .get('http://localhost:8080/feedback/feedbackcount')
      .subscribe((res) => {
        console.log(res);
        this.feedbackData = res;
      });
    this.http.get('http://localhost:8080/user/totaluser').subscribe((res) => {
      console.log(res);
      this.totalusers = res;
      console.log(this.totalusers);
    });
    this.http
      .get('http://localhost:8080/showrooms/showroomcount')
      .subscribe((res) => {
        console.log(res);
        this.showroomcount = res;
      });
    this.http.get('http://localhost:8080/user/last30').subscribe((res) => {
      console.log(res);
      this.last30 = res;
    });
    this.http
      .get('http://localhost:8080/slot-bookings/brandCount')
      .subscribe((res) => {
        console.log(res);
        this.brandsdata = res;
        for (let i = 0; i < this.brandsdata.length; i++) {
          this.brands.push(this.brandsdata[i].brand); // Push the month to the months array
          this.bcounts.push(this.brandsdata[i].totalUsers);
          // Push the count to the counts array
        }
        console.log('DATA COUNTS: ', this.bcounts);
        console.log('DATA BRANDS: ', this.brands);
        console.log(this.bcounts[0], this.bcounts[1], this.bcounts[2]);
        this.config3 = {
          type: 'pie', // Pie chart type
          data: {
            labels: ['Renault', 'Nissan', 'Mitsubishi'], // Labels
            datasets: [
              {
                label: 'Car Bookings',
                data: [this.bcounts[0], this.bcounts[1], this.bcounts[2]], // Sample data
                backgroundColor: ['#365CF5', '#9b51e0', '#4CAF50'],
                hoverBackgroundColor: ['#2A46B1', '#7F37A8', '#388E3C'],
                borderWidth: 5,
                borderColor: '#ffffff',
              },
            ],
          },
          options: {
            responsive: false, // Responsive chart
            maintainAspectRatio: false, // Allow resizing
          },
        };
        this.chart3 = new Chart('Chart3', this.config3);
      });

    this.http
      .get('http://localhost:8080/user/userMonthlyCount')
      .subscribe((res) => {
        console.log('DATAAAAAAAAAAA');

        console.log(res);

        this.usermonthly = res;

        for (let i = 0; i < this.usermonthly.length; i++) {
          this.months1.push(this.usermonthly[i].month); // Push the month to the months array
          this.counts.push(this.usermonthly[i].count); // Push the count to the counts array
        }

        this.config = {
          type: 'line',
          data: {
            labels: this.months1,
            datasets: [
              {
                label: 'Increase in Website Usage (Number of Users)',
                backgroundColor: '#365CF5',
                borderColor: '#365CF5',
                data: this.chardata1,
                pointBackgroundColor: 'transparent',
                pointHoverBackgroundColor: '#365CF5',
                pointBorderColor: 'transparent',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 5,
                borderWidth: 5,
                pointRadius: 8,
                pointHoverRadius: 8,
                cubicInterpolationMode: 'monotone', // Add this line for curved line
              },
            ],
          },
        };
        this.chart = new Chart('Chart1', this.config);
      });

    this.http
      .get('http://localhost:8080/slot-bookings/userMonthlyCount')
      .subscribe((res) => {
        console.log('DATAAAAAAAAAAA');

        console.log(res);

        this.slotusermonthly = res;

        for (let i = 0; i < this.slotusermonthly.length; i++) {
          this.slotmonths.push(this.slotusermonthly[i].month); // Push the month to the months array
          this.slotcounts.push(this.slotusermonthly[i].count); // Push the count to the counts array
        }
        this.config2 = {
          type: 'bar',
          data: {
            labels: this.slotmonths,
            datasets: [
              {
                label: 'Users (Number) ',
                backgroundColor: '#365CF5',
                borderRadius: 30,
                barThickness: 6,
                maxBarThickness: 8,
                data: this.slotcounts,
              },
            ],
          },
        };
        this.chart2 = new Chart('Chart2', this.config2);
      });
    this.processFeedbackData();
    // this.changeFeedbackYear();
    this.calculateSum();
    console.log(this.selectedYear);
  }

  feedbackData: any = [];
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  positiveCounts: number[] = [];
  negativeCounts: number[] = [];
  totalpositive = 0;
  totalnegative = 0;
  selectedYear: String = 'y2024';
  year:number=2024;
  processFeedbackData(): void {
    console.log('INSIDE PROCESS FEEDBACKS');
    
    for (let i = 0; i < this.months.length; i++) {
      let month= this.months[i] +" "+ this.year;
  
      let positive = 0;
      let negative = 0;
  
      // Check if feedback data exists for the given month
      if (this.feedbackData[month]) {
        positive = this.feedbackData[month].positive || 0;
        negative = this.feedbackData[month].negative || 0;
      }
  
      // Push the counts into the arrays
      this.positiveCounts.push(positive);
      this.negativeCounts.push(negative);
    }
  }
  
  // changeFeedbackYear() {
  //    let year1 = this.selectedYear === "y2024" ? 2024 : 2025;
  //   this.processFeedbackData(year1);
  //   // this.calculateSum();
  //   console.log("CHART UPDATION"+year1);
  //   this.chart4.update();
  // }
  
  calculateSum() {
    this.totalpositive = this.positiveCounts.reduce(
      (sum, current) => sum + current,
      0
    );
    this.totalnegative = this.negativeCounts.reduce(
      (sum, current) => sum + current,
      0
    );
    this.usersatisfaction = (
      (this.totalpositive * 100) /
      (this.totalnegative + this.totalpositive)
    ).toFixed(2);
    console.log(this.usersatisfaction);
  }

  chart: any;
  chart2: any;
  chart3: any;
  chart4: any;
  chart4data: any;
  chardata1: any = this.counts;
  usersatisfaction: any;

  public config4: any = {
    type: 'bar',
    data: {
      labels: this.months,

      datasets: [
        {
          label: 'Positive Feedback',
          backgroundColor: '#365CF5',
          borderColor: 'transparent',
          borderRadius: 20,
          borderWidth: 5,
          barThickness: 20,
          maxBarThickness: 20,
          data: this.positiveCounts,
        },
        {
          label: 'Negative Feedback',
          backgroundColor: '#d50100',
          borderColor: 'transparent',
          borderRadius: 20,
          borderWidth: 5,
          barThickness: 20,
          maxBarThickness: 20,
          data: this.negativeCounts,
        },
      ],
    },
  };
}
