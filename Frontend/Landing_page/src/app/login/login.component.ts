import {  Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  forgotPasswordForm: FormGroup;
  OtpForm:FormGroup
  errorMsg = "";
  formshow = false;
  isOpen = false;
  sendOtp: boolean = true;
  otpVerified:boolean =false;
  PasswordForm:FormGroup;
  constructor(private fb: FormBuilder, private route: Router, private http: HttpClient) {}
 
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
 
    this.forgotPasswordForm = this.fb.group(
      {
        recipient : ['', [Validators.required, Validators.email]],
      }
    );
    this.OtpForm = this.fb.group({
      otp: ['', [Validators.required,Validators.maxLength(4), Validators.pattern(/^\d{4}$/)]],
    })
    this.PasswordForm=this.fb.group({
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',[Validators.required]]
    },{ validators: this.passwordMatchValidator })
   
  }
  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { match: true };
  }
  submit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;console.log(this.loginForm.get('email'));
      
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
            console.log(res);
            
            const name = localStorage.setItem("adminName",res.name);
            localStorage.setItem("address", res.address);
            localStorage.setItem("id", "1");
            localStorage.setItem("useremail", email);
            localStorage.setItem("login", "true");
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
openPop() {
    this.isOpen = true;
    this.sendOtp = true;
    document.body.style.overflow = "hidden";
  }
closePop() {
    this.isOpen = false;
    this.sendOtp = true;
    document.body.style.overflow = "auto";
    window.location.reload();
  }
  sendOtpToMail() {
    if (this.forgotPasswordForm.valid) {
    const recipientEmail = this.forgotPasswordForm.get('recipient')?.value;
    localStorage.setItem("update",recipientEmail);
    const otpRequest = {
        recipient: recipientEmail,
        subject: "Password Reset OTP",
        text: "Please use this OTP to reset your password."
    };
  this.http.post("http://localhost:8080/sendmail", otpRequest)
      .subscribe(
        (res: any) => {
          this.sendOtp = false;
        },
        (err) => {
          console.log(err);
          this.errorMsg = err.error['message'];
          alert(`Error: ${this.errorMsg}`);
          if (err.status === 400) {  
            localStorage.setItem("update", recipientEmail);  
          }
        }
      );
    }
  }
 
  resetPassword() {
    if (this.OtpForm.valid) {
      const otp = this.OtpForm.get('otp')?.value;
      const userEmail = localStorage.getItem('update');
      const verifyotp={ recipient: userEmail, text:otp};
      console.log("Password reset successful", verifyotp);
      this.http.post("http://localhost:8080/verifyotp",verifyotp).subscribe((res:any)=>{
        this.otpVerified=true;
      },(err)=>{
        console.log(err);
        this.errorMsg = err.error['message'];
    })
    }
  }
  updatePassword(){
    if(this.PasswordForm.valid){
      const password = this.PasswordForm.get('password').value;
    const userEmail = localStorage.getItem('update');
    const newPassword = {password : password , email : userEmail};
    this.http.put("http://localhost:8080/user/updatePassword",newPassword).subscribe((res)=>{
      alert("The password Updated Successfully")
      window.location.reload();
      localStorage.removeItem('update')
    },(err)=>{
      this.errorMsg = err.error['message'];
    })
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
