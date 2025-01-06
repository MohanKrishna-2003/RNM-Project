import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
    searchTerm: string = '';
    users: Array<any> = [];
    filteredUsers: Array<any> = [];
  
    ngOnInit(): void {
      // Mock data for users
      this.users = [
        { name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St, Springfield' },
        { name: 'Jane Smith', email: 'jane.smith@example.com', address: '456 Oak St, Springfield' },
        { name: 'Peter Parker', email: 'peter.parker@example.com', address: '789 Pine St, Queens' },
        { name: 'Mary Jane', email: 'mary.jane@example.com', address: '101 Maple St, Queens' },
        { name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St, Springfield' },
        { name: 'Jane Smith', email: 'jane.smith@example.com', address: '456 Oak St, Springfield' },
        { name: 'Peter Parker', email: 'peter.parker@example.com', address: '789 Pine St, Queens' },
        { name: 'Mary Jane', email: 'mary.jane@example.com', address: '101 Maple St, Queens' },
        { name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St, Springfield' },
        { name: 'Jane Smith', email: 'jane.smith@example.com', address: '456 Oak St, Springfield' },
        { name: 'Peter Parker', email: 'peter.parker@example.com', address: '789 Pine St, Queens' },
        { name: 'Mary Jane', email: 'mary.jane@example.com', address: '101 Maple St, Queens' },
        { name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St, Springfield' },
        { name: 'Jane Smith', email: 'jane.smith@example.com', address: '456 Oak St, Springfield' },
        { name: 'Peter Parker', email: 'peter.parker@example.com', address: '789 Pine St, Queens' },
        { name: 'Mary Jane', email: 'mary.jane@example.com', address: '101 Maple St, Queens' }
      ];
      
      this.filteredUsers = [...this.users];
    }
  
    filterUsers() {
      this.filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

   
  }
  

