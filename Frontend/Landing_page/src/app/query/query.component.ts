import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';

interface Contact {
  name: string;
  message: string;
  email: string;
}

@Component({
  selector: 'app-query',
  imports: [CommonModule,AdminHeaderComponent,AdminHeaderComponent],
  templateUrl: './query.component.html',
  styleUrl: './query.component.css'
})
export class QueryComponent {

  contactList: Contact[] = []; // Holds all feedback
  displayedQuery: Contact[] = []; // Holds only the currently displayed feedback
  pageSize: number = 10; // Number of feedbacks to show initially
  currentPage: number = 0; // To keep track of the current page for "Load More"

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Contact[]>("http://localhost:8080/contact/contact").subscribe({
      next: (res) => {
        console.log(res);
        this.contactList = res;
        this.displayQuery(); // Display initial set of feedbacks
      },
      error: (err) => {
        console.error('Error fetching feedback:', err);
      }
    });
  }

  // Display feedback for the current page
  displayQuery(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedQuery = this.contactList.slice(0, endIndex);
  }

  // Load more feedback when the button is clicked
  loadMore(): void {
    this.currentPage++;
    this.displayQuery();
  }


  // Get background class for notifications
  getBackgroundClass(index: number): string {
    const classes = ['orange-bg', 'green-bg', 'blue-bg', 'yellow-bg'];
    return classes[index % classes.length];
  }
}
