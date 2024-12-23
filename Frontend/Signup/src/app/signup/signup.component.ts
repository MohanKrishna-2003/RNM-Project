import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  // Form groups for both login and sign-up
  loginForm!: FormGroup;
  signUpForm!: FormGroup;

  // Variable to toggle between login and sign-up forms
  isSignUp: boolean = false;

  constructor(private fb: FormBuilder, private service: CommonService, private route: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // Login Form Initialization
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    // Sign Up Form Initialization
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[A-Za-z\\s-]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Password matching validator for sign-up
  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { match: true };
  }


  // Clear form fields
  // clear(): void {
  //   if (this.isSignUp) {
  //     this.signUpForm.reset();
  //   } else {
  //     this.loginForm.reset();
  //   }
  // }

  // Submit form based on the current form type (login or sign-up)
  submit(): void {
    if (this.isSignUp && this.signUpForm.valid) {
      const signUpData = this.signUpForm.value;
      this.http.post('http://localhost:8080/addUserData', signUpData).subscribe(res => {
        console.log(res);
        alert("SUCCESSSS");

      });
    } else if (!this.isSignUp && this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.http.post('http://localhost:8080/login', loginData).subscribe(res => {
        console.log(res);
        alert("SUCCESSSS");

      },(error)=>{
        console.log("Login Failed",error);
        alert("Invalid email or password");
        
      });
    }
  }

  success(){
    alert("LOGIN SUCCESSFULLL");
  }
}
