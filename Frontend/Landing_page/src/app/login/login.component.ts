import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule  } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { error } from 'jquery';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule ,  ReactiveFormsModule],
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
    this.http.post("http://localhost:8080/user/loginByPost", data).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem("login",res.email);
        localStorage.setItem("id",res.id);
        localStorage.setItem("username",res.name);
        localStorage.setItem("useremail",res.email);
        localStorage.setItem("phone",res.mobile);
        localStorage.setItem("address",res.address)
        // localStorage.removeItem("login");
        // localStorage.clear(); 
        
        console.log("Login success");
        this.route.navigateByUrl(""); 
      },
      (error) => {
        console.log("Login failed:", error);
        alert("Invalid email or password. Please try again.");
      }
    );
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