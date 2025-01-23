import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Feedback {
  user_name: string;
  feedback: string;
  user_email: string;
}

@Component({
  selector: 'app-user-feedback',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule],
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.css']
})
export class UserFeedbackComponent implements OnInit {
  feedbackList: Feedback[] = []; // Holds all feedback
  displayedFeedback: Feedback[] = []; // Holds only the currently displayed feedback
  pageSize: number = 10; // Number of feedbacks to show initially
  currentPage: number = 0; // To keep track of the current page for "Load More"

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Feedback[]>("http://localhost:8080/feedback/feedbackchart").subscribe({
      next: (res) => {
        console.log(res);
        this.feedbackList = res;
        this.displayFeedback(); // Display initial set of feedbacks
      },
      error: (err) => {
        console.error('Error fetching feedback:', err);
      }
    });
  }

  // Display feedback for the current page
  displayFeedback(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedFeedback = this.feedbackList.slice(0, endIndex);
  }

  // Load more feedback when the button is clicked
  loadMore(): void {
    this.currentPage++;
    this.displayFeedback();
  }

  // Delete feedback
  deleteFeedback(feedback: Feedback): void {
    if (confirm(`Are you sure you want to delete feedback from ${feedback.user_name}?`)) {
      this.feedbackList = this.feedbackList.filter((f) => f !== feedback);
      this.displayFeedback(); // Update the displayed feedback list
    }
  }

  // Get background class for notifications
  getBackgroundClass(index: number): string {
    const classes = ['orange-bg', 'green-bg', 'blue-bg', 'yellow-bg'];
    return classes[index % classes.length];
  }
}
