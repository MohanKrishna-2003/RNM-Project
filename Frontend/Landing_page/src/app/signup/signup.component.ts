
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  errorMsg = "";
  signupForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern('^[A-Za-z\\s-]+$')]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required]]
     },{ validators: this.passwordMatchValidator });
  }

  // Password matching validator for sign-up
  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { match: true };
  }

  submit() {
    if (this.signupForm.valid) {
      const data = this.signupForm.value;
      console.log(data);
      this.http.post('http://localhost:8080/user/addUserData', data).subscribe(
        {
          next: (res:any) => {
            this.router.navigateByUrl("/login");
          }, error: (err) => {
            console.log(err);
            // this.errorMsg = err.error['message'];
            if (err.error.message === "Email has already been registered") {
              this.errorMsg = 'This email is already registered';
              this.signupForm.controls['email'].setErrors({'alreadyRegistered': true});
            } else if (err.error.message === "Mobile number has already been registered") {
              this.errorMsg = 'This mobile number is already registered';
              this.signupForm.controls['mobile'].setErrors({'alreadyRegistered': true});
            } else {
              this.errorMsg = 'An error occurred, please try again';
            }
          }
        }
      );
    }
  }
}
