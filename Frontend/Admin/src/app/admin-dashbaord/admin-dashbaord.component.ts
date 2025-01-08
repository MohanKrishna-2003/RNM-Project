import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import {Chart, registerables} from 'chart.js';
import { HttpClient } from '@angular/common/http';

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
  imports: [AdminHeaderComponent  ],
  templateUrl: './admin-dashbaord.component.html',
  styleUrl: './admin-dashbaord.component.css'
})

export class AdminDashbaordComponent implements OnInit {
constructor(private http: HttpClient){
}
 ngOnInit(): void {
this.chart= new Chart('Chart1', this.config);
this.chart2= new Chart('Chart2',this.config2);
this.chart3= new Chart('Chart3',this.config3);
this.chart4= new Chart('Chart4',this.config4);

    this.http.get('http://localhost:8085/admin/feedbackcount').subscribe(res => {
      console.log(res);
      this.feedbackData=res;
      console.log(this.chart4data);
    });

    this.processFeedbackData();
    this.calculateSum();

    
  } 
  feedbackData: any 
  months: string[] = [
    "January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"
  ];
  positiveCounts: number[] = [];
  negativeCounts: number[] = [];
  totalpositive =0;
  totalnegative=0


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
    this.totalpositive = this.positiveCounts.reduce((sum, current) => sum + current, 0);
    this.totalnegative=this.negativeCounts.reduce((sum, current) => sum + current, 0)
  }
 


chart:any;
chart2:any;
chart3:any;
chart4:any;
chart4data:any;
chardata1:any =[600, 800, 750, 880, 940, 880, 900, 770, 920]

 public config: any = {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Fab",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      
      ],
      datasets: [
        {
          label: "Increase in Website Usage (Number of Users)",
          backgroundColor: "#365CF5",
          borderColor: "#365CF5",
          data: this.chardata1
          ,
          pointBackgroundColor: "transparent",
          pointHoverBackgroundColor: "#365CF5",
          pointBorderColor: "transparent",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 5,
          borderWidth: 5,
          pointRadius: 8,
          pointHoverRadius: 8,
          cubicInterpolationMode: "monotone", // Add this line for curved line
        },
      ],
    },
  
  };

  
  public config2:any = { type: "bar",
    data: {
      labels: [
        "Jan",
        "Fab",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Revenue (Dollars) ",
          backgroundColor: "#365CF5",
          borderRadius: 30,
          barThickness: 6,
          maxBarThickness: 8,
          data: [
            600, 700, 1000, 700, 650, 800, 690, 740, 720, 1120, 876, 900,
          ],
        },
      ],
    },
   
  };

  // =========== chart three start
  public config3 :any=  {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Revenue",
          backgroundColor: "transparent",
          borderColor: "#365CF5",
          data: [80, 120, 110, 100, 130, 150, 115, 145, 140, 130, 160, 210],
          pointBackgroundColor: "transparent",
          pointHoverBackgroundColor: "#365CF5",
          pointBorderColor: "transparent",
          pointHoverBorderColor: "#365CF5",
          pointHoverBorderWidth: 3,
          pointBorderWidth: 5,
          pointRadius: 5,
          pointHoverRadius: 8,
          fill: false,
          tension: 0.4,
        },
        {
          label: "Profit",
          backgroundColor: "transparent",
          borderColor: "#9b51e0",
          data: [
            120, 160, 150, 140, 165, 210, 135, 155, 170, 140, 130, 200,
          ],
          pointBackgroundColor: "transparent",
          pointHoverBackgroundColor: "#9b51e0",
          pointBorderColor: "transparent",
          pointHoverBorderColor: "#9b51e0",
          pointHoverBorderWidth: 3,
          pointBorderWidth: 5,
          pointRadius: 5,
          pointHoverRadius: 8,
          fill: false,
          tension: 0.4,
        }
      ],
    },
    options: {
      plugins: {
        tooltip: {
          intersect: false,
          backgroundColor: "#fbfbfb",
          titleColor: "#8F92A1",
          bodyColor: "#272727",
          titleFont: {
            size: 16,
            family: "Plus Jakarta Sans",
            weight: "400",
          },
          bodyFont: {
            family: "Plus Jakarta Sans",
            size: 16,
          },
          multiKeyBackground: "transparent",
          displayColors: false,
          padding: {
            x: 30,
            y: 15,
          },
          borderColor: "rgba(143, 146, 161, .1)",
          borderWidth: 1,
          enabled: true,
        },
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
      },
      layout: {
        padding: {
          top: 0,
        },
      },
      responsive: true,
      // maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        y: {
          grid: {
            display: false,
            drawTicks: false,
            drawBorder: false,
          },
          ticks: {
            padding: 35,
          },
          max: 350,
          min: 50,
        },
        x: {
          grid: {
            drawBorder: false,
            color: "rgba(143, 146, 161, .1)",
            drawTicks: false,
            zeroLineColor: "rgba(143, 146, 161, .1)",
          },
          ticks: {
            padding: 20,
          },
        },
      },
    },
  };
  // =========== chart three end

  // ================== chart four start
  public config4 :any= {
    type: "bar",
    data: {
      // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: this.months,

      datasets: [
        {
          label: "Positive Feedback",
          backgroundColor: "#365CF5",
          borderColor: "transparent",
          borderRadius: 20,
          borderWidth: 5,
          barThickness: 20,
          maxBarThickness: 20,
          data: this.positiveCounts,
        },
        {
          label: "Negative Feedback",
          backgroundColor: "#d50100",
          borderColor: "transparent",
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