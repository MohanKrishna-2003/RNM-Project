import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  loginForm!: FormGroup;
  signUpForm!: FormGroup;

  isSignUp: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    // Sign Up Form Initialization
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[A-Za-z\\s-]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      address:['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Password matching validator for sign-up
  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { match: true };
  }

  // Submit form based on the current form type (login or sign-up)
  submitSignUp(): void {
    if (this.signUpForm.valid) {
      const signUpData = this.signUpForm.value;
      console.log(signUpData);
      this.http.post('http://localhost:8080/userlogin/addUserData', signUpData).subscribe(res => {
        console.log(res);
        alert("Sign-Up Successful");
      }, error => {
        console.log("Sign-Up Failed", error);
        alert("An error occurred during sign-up");
      });
    } else {
      alert("Please fill all fields correctly");
    }
  }

  submitLogin(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log(loginData);
      this.http.post('http://localhost:8080/userlogin/loginByPost', loginData).subscribe(res => {
        console.log(res);
        alert("Login Successful");
      }, error => {
        console.log("Login Failed", error);
        alert("Invalid email or password");
      });
    } else {
      alert("Please enter valid credentials");
    }
  }

  // Clear form fields
  // clear(): void {
  //   if (this.isSignUp) {
  //     this.signUpForm.reset();
  //   } else {
  //     this.loginForm.reset();
  //   }
  // }

  // Toggle between sign-up and login forms
  toggleForm() {
    this.isSignUp = !this.isSignUp;
  }
}
