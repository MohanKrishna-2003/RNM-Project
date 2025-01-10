import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpBackend, HttpClient } from '@angular/common/http';

interface User{
  id:number;
  name:String;
  email:String;
  mobile:String;
  address:String;
}
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
   constructor(private http: HttpClient){

   }
   ngOnInit(): void {
    this.http.get<User[]>("http://localhost:8085/user/userdata").subscribe({
      next: (res) => {
        console.log(res);
        this.users = res;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
    this.filteredUsers = [...this.users];

  }
  
    filterUsers() {
      this.filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

   
  }
  

