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

  constructor(private fb: FormBuilder, private route:Router , private http:HttpClient) { }

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
    this.http.post("http://localhost:8085/userlogin/login", data).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem("login",res.email);
        localStorage.setItem("id",res.id);
        localStorage.setItem("username",res.name);
        localStorage.setItem("useremail",res.email);
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