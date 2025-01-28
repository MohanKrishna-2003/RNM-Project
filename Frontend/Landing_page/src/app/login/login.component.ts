import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule  } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule ,  ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
 
  constructor(private fb: FormBuilder, private route: Router, private http: HttpClient) { }
 
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    
  }
 
  submit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      const data = { email, password };
 
      // Determine if it's an admin login or a user login based on email domain
      const isAdmin = email.startsWith('manager.myrnm');
      console.log("----"+isAdmin);
      
      const apiEndpoint = isAdmin
        ? 'http://localhost:8080/admin/adminlogin'  // Admin login API endpoint
        : 'http://localhost:8080/user/loginByPost'; // User login API endpoint
 
      // Make API call based on the type of user
      this.http.post(apiEndpoint, data).subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem("login", res.email);
          localStorage.setItem("id", res.id);
          localStorage.setItem("username", res.name);
          localStorage.setItem("useremail", res.email);
          localStorage.setItem("phone",res.mobile);
         localStorage.setItem("address",res.address);
         
 
          // Redirect based on the type of user
          if (isAdmin) {
            console.log("Admin login success");
            const name = localStorage.setItem("adminName",res.name);
            this.route.navigateByUrl('/dashboard');
            localStorage.setItem("admin",email) ; // Redirect to admin dashboard
          } else {
            console.log("User login success");
            this.route.navigateByUrl('/');  // Redirect to user dashboard
          }
        },
        (error) => {
          console.log("Login failed:", error);
          alert("Invalid email or password. Please try again.");
        }
      );
    }
  }
}























































































 //     this.service.loginDetails(data).subscribe({
  //       next: (response: any) => {
  //         console.log('Login successful:', response);
  //         this.route.navigateByUrl("signup");
          
  //       },
  //       error: (err: any) => {
  //         console.log('Login failed:', err);
         
  //       }
  //     });
  //   } else {
  //     console.log('Form is invalid');
  //   }