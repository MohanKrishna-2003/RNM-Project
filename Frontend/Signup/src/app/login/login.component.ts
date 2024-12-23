import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { CommonModule  } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule ,  ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup; // Make sure 'FormGroup' is initialized

  constructor(private fb: FormBuilder, private service: CommonService , private route:Router , private http:HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email is required and must be valid
      password: ['', [Validators.required]]                   // Password is required
    });
  }
  clear(){
    this.loginForm.reset();
  }





// submit(): void {
//   if (this.loginForm.valid) {
//     const email = this.loginForm.get('email')?.value;
//     const password = this.loginForm.get('password')?.value;

//     const data = { email, password };  
//     this.http.post("http://localhost:8080/loginByPost", data).subscribe(
//       (res: any) => {
//         console.log("Login success");
//         this.route.navigateByUrl("home"); 
//       },
//       (error) => {
//         console.log("Login failed:", error);
//         alert("Invalid email or password. Please try again.");
//       }
//     );
//   }
// }
submit(){
  if(this.loginForm.valid){
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const params = new HttpParams()
    .set('email', email)
    .set('password', password);
    this.http.get("http://localhost:8080/getLoginDetails",{params}).subscribe((res:any)=>{
      console.log("Login Success");
      this.route.navigateByUrl("");
      
    },(error)=>{
      console.log("Login Failed",error);
      alert("Invalid email or password");
      
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