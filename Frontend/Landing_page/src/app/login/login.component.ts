import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule  } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { error } from 'jquery';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule ,  ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup; 
  forgotPasswordForm: FormGroup;
  errorMsg:""
  formshow = false;  // Initialize form visibility
  constructor(private fb: FormBuilder, private route:Router , private http:HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{ validators: this.passwordMatchValidator });
  };
  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { match: true };
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
            localStorage.setItem("admin",res.name) ; // Redirect to admin dashboard
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
openForgotPasswordModal(){}
isOpen=false;
 
  openPop(){
    this.isOpen=true;
    document.body.style.overflow="hidden";
 
  }
  closePop(){
    this.isOpen=false;
    document.body.style.overflow="auto";
  }
  submitForgotPassword() {
    const data = this.forgotPasswordForm.value;
    this.http.put('http://localhost:8080/user/updatePassword', data).subscribe(
      (res) => {
        console.log(res);
        alert('Password reset successful!');
        this.forgotPasswordForm.reset();
        this.closePop();
      },
      (err) => {
        console.log('Error during password reset:', err);
        this.errorMsg = err.error['message'];
        this.forgotPasswordForm.reset();
      }
    );
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