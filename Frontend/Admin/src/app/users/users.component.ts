import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    constructor(private http:HttpClient){}
    // ngOnInit(): void {
    //   // Mock data for users
    //   this.users = [
    //     { name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St, Springfield' },
    //     { name: 'Jane Smith', email: 'jane.smith@example.com', address: '456 Oak St, Springfield' },
    //     { name: 'Peter Parker', email: 'peter.parker@example.com', address: '789 Pine St, Queens' },
    //     { name: 'Mary Jane', email: 'mary.jane@example.com', address: '101 Maple St, Queens' },
    //     { name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St, Springfield' },
    //     { name: 'Jane Smith', email: 'jane.smith@example.com', address: '456 Oak St, Springfield' },
    //     { name: 'Peter Parker', email: 'peter.parker@example.com', address: '789 Pine St, Queens' },
    //     { name: 'Mary Jane', email: 'mary.jane@example.com', address: '101 Maple St, Queens' },
    //     { name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St, Springfield' },
    //     { name: 'Jane Smith', email: 'jane.smith@example.com', address: '456 Oak St, Springfield' },
    //     { name: 'Peter Parker', email: 'peter.parker@example.com', address: '789 Pine St, Queens' },
    //     { name: 'Mary Jane', email: 'mary.jane@example.com', address: '101 Maple St, Queens' },
    //     { name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St, Springfield' },
    //     { name: 'Jane Smith', email: 'jane.smith@example.com', address: '456 Oak St, Springfield' },
    //     { name: 'Peter Parker', email: 'peter.parker@example.com', address: '789 Pine St, Queens' },
    //     { name: 'Mary Jane', email: 'mary.jane@example.com', address: '101 Maple St, Queens' }
    //   ];
      
    //   this.filteredUsers = [...this.users];
    // }
  
    
    ngOnInit(): void {
      
      this.getAllTheUserList().subscribe((data: any) => {
        this.users = data; 
        this.filteredUsers = [...this.users];
      });
    }
    getAllTheUserList(): Observable<any> {
<<<<<<< HEAD
      return this.http.get('http://localhost:8080/user/userdata'); 
=======
      return this.http.get('http://localhost:8089/userlogin/getAllTheUserList'); 
>>>>>>> f2ac65f4b7d918fb402144fb2282bfa5130c9e32
    }

    filterUsers() {
      this.filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
   
  }
  

