

import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonDataServiceService } from '../common-data-service.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  searchTerm: string = '';
  users: Array<any> = [];
  filteredUsers: Array<any> = [];
  pageSize: number = 10;  // Number of users per page
  page: number = 0;       // Current page index

  constructor(private http: HttpClient,  private commondata: CommonDataServiceService) {}

  ngOnInit(): void {
    // Get the data when component initializes
    this.commondata.loadData().subscribe((data: any) => {
      this.users = this.commondata.userwithfeedbacks;
      this.filteredUsers = this.users.slice(0, this.pageSize); // Initially load the first 10 users
    });
    // this.commondata.getCenterDetails().subscribe((data: any) => {
    //     this.users = this.commondata.getUserDetails(data);
    //     this.filteredUsers = this.users.slice(0, this.pageSize); // Initially load the first 10 users
    //   });
  }

  // getAllTheUserList(): Observable<any> {
  //   return this.http.get('http://localhost:8080/user/userdata');
  // }

  // Filter users based on the search term
  filterUsers() {
    if (this.searchTerm.trim() === '') {
      // If no search term, reset filtered users to all users
      this.filteredUsers = this.users.slice(0, (this.page + 1) * this.pageSize);
    } else {
      // If there is a search term, filter based on that
      const filtered = this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.filteredUsers = filtered.slice(0, (this.page + 1) * this.pageSize);
    }
  }

  // Load more users (pagination logic)
  loadMore() {
    this.page++; // Increase the page index
    const startIndex = this.page * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    // Load more users if available
    if (startIndex < this.users.length) {
      this.filteredUsers = [...this.filteredUsers, ...this.users.slice(startIndex, endIndex)];
    }
  }
}


