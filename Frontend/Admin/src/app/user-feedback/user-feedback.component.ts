import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Feedback{
  name:String;
  feedback:String;
}
@Component({
  selector: 'app-user-feedback',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule],
  templateUrl: './user-feedback.component.html',
  styleUrl: './user-feedback.component.css'
})
export class UserFeedbackComponent implements OnInit {
    feedbackList: Array<any> = [];
  constructor(private http: HttpClient){}
    ngOnInit(): void {
      this.http.get<Feedback[]>("http://localhost:8080/feedback/feedbackchart").subscribe({
        next: (res) => {
          console.log(res);
          this.feedbackList = res;
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        }
      });
    }
  

  
  
  
    deleteFeedback(feedback: any) {
      if (confirm(`Are you sure you want to delete feedback from ${feedback.user}?`)) {
        this.feedbackList = this.feedbackList.filter((f) => f !== feedback);
      }
    }
  
    getBackgroundClass(index: number): string {
      const classes = ['orange-bg', 'green-bg', 'blue-bg', 'yellow-bg'];
      return classes[index % classes.length];
    }
  }
  

