import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { log } from 'node:console';

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
  imports: [AdminHeaderComponent],
  templateUrl: './admin-dashbaord.component.html',
  styleUrl: './admin-dashbaord.component.css',
})
export class AdminDashbaordComponent implements OnInit {
  constructor(private http: HttpClient) {}
  totalusers: any;
  usermonthly: any;
  months1: any = [];
  counts: any = [];
  slotusermonthly:any;
  slotmonths: any =[];
  slotcounts: any =[];
  last30:any;
  ngOnInit(): void {
    this.chart = new Chart('Chart1', this.config);
    this.chart2 = new Chart('Chart2', this.config2);
    this.chart3 = new Chart('Chart3', this.config3);
    this.chart4 = new Chart('Chart4', this.config4);

    this.http
      .get('http://localhost:8080/feedback/feedbackcount')
      .subscribe((res) => {
        console.log(res);
        this.feedbackData = res;
        console.log(this.chart4data);
      });
    this.http.get('http://localhost:8080/user/totaluser').subscribe((res) => {
      console.log(res);
      this.totalusers = res;
      console.log(this.totalusers);
    });

    this.http.get('http://localhost:8080/user/last30').subscribe((res) => {
      console.log(res);
      this.last30 = res;
    });
    this.http
      .get('http://localhost:8080/user/userMonthlyCount')
      .subscribe((res) => {
        console.log('DATAAAAAAAAAAA');

        console.log(res);

        this.usermonthly = res;

        for (let i = 0; i < this.usermonthly.length; i++) {
          this.months1.push(this.usermonthly[i].month);  // Push the month to the months array
          this.counts.push(this.usermonthly[i].count);  // Push the count to the counts array
      }
        
      });

      this.http
      .get('http://localhost:8080/slot-bookings/userMonthlyCount')
      .subscribe((res) => {
        console.log('DATAAAAAAAAAAA');

        console.log(res);

        this.slotusermonthly = res;

        for (let i = 0; i < this.slotusermonthly.length; i++) {
          this.slotmonths.push(this.slotusermonthly[i].month);  // Push the month to the months array
          this.slotcounts.push(this.slotusermonthly[i].count);  // Push the count to the counts array
      }
        
      });
    this.processFeedbackData();
    this.calculateSum();
  }
  feedbackData: any;
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

  processFeedbackData(): void {
    // Iterate through each month and check if feedback data exists for it
    for (let i = 0; i < this.months.length; i++) {
      let month = this.months[i] + ' 2024'; // Add year to month for matching

      // Initialize counts with 0 if no data is found for the month
      let positive = 0;
      let negative = 0;
      let neutral = 0;

      // Check if data exists for this month and update the counts accordingly
      if (this.feedbackData[month]) {
        positive = this.feedbackData[month].positive || 0;
        negative = this.feedbackData[month].negative || 0;
      }

      // Push the counts into the arrays
      this.positiveCounts.push(positive);
      this.negativeCounts.push(negative);
    }
  }

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
  public config: any = {
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

  public config2: any = {
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

  // =========== chart three start
  public config3: any = {
    type: 'pie', // Pie chart type
    data: {
      labels: ['Renault', 'Nissan', 'Mitsubishi'], // Labels
      datasets: [
        {
          label: 'Car Bookings',
          data: [50, 30, 20], // Sample data
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
  
  
  
  // =========== chart three end

  // ================== chart four start
  public config4: any = {
    type: 'bar',
    data: {
      // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
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
    // options: {
    //   plugins: {
    //     tooltip: {
    //       backgroundColor: "#F3F6F8",
    //       titleColor: "#8F92A1",
    //       titleFontSize: 12,
    //       bodyColor: "#171717",
    //       bodyFont: {
    //         weight: "bold",
    //         size: 16,
    //       },
    //       multiKeyBackground: "transparent",
    //       displayColors: false,
    //       padding: {
    //         x: 30,
    //         y: 10,
    //       },
    //       bodyAlign: "center",
    //       titleAlign: "center",
    //       enabled: true,
    //     },
    //     legend: {
    //       display: false,
    //     },
    //   },
    //   layout: {
    //     padding: {
    //       top: 0,
    //     },
    //   },
    //   responsive: true,
    //   // maintainAspectRatio: false,
    //   title: {
    //     display: false,
    //   },
    //   scales: {
    //     y: {
    //       grid: {
    //         display: false,
    //         drawTicks: false,
    //         drawBorder: false,
    //       },
    //       ticks: {
    //         padding: 35,
    //         max: 1200,
    //         min: 0,
    //       },
    //     },
    //     x: {
    //       grid: {
    //         display: false,
    //         drawBorder: false,
    //         color: "rgba(143, 146, 161, .1)",
    //         zeroLineColor: "rgba(143, 146, 161, .1)",
    //       },
    //       ticks: {
    //         padding: 20,
    //       },
    //     },
    //   },
    // },
  };
}
