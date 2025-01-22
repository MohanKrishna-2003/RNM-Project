import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-feedback',
  standalone:true,
  imports: [ReactiveFormsModule , FormsModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  feedbackForm: FormGroup;
  selectedRatingMessage: string | null = null;  
  testimonials:any[]=[];
  constructor(private http: HttpClient, private fb: FormBuilder,private router:Router) {
    this.feedbackForm = this.fb.group({
      user_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      feedback: ['', Validators.required],
      user_id: [1, Validators.required],
      users_ratings: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    const name = localStorage.getItem("username");
    const email = localStorage.getItem("useremail");
    if (name) {
      this.feedbackForm.patchValue({
        user_name: name
      });
    }
    if (email) {
      this.feedbackForm.patchValue({
        user_email: email
      });
    }
  }

  selectRating(value: number): void {
    this.feedbackForm.patchValue({
      users_ratings: value
    });
    this.switch(value);  // Call the switch function to update the message
  }

  switch(value: number) {
    switch (value) {
      case 1:
      case 2:
        this.selectedRatingMessage = "We're sorry you had a very bad experience. 😔";
        break;
      case 3:
        this.selectedRatingMessage = "Thanks for your feedback! We'll do better. 😊";
        break;
      case 4:
        this.selectedRatingMessage = "Thanks for your feedback! We're glad you had a good experience. 😀";
        break;
      case 5:
        this.selectedRatingMessage = "Thank you! We're thrilled you had an excellent experience! 🎉";
        break;
      default:
        this.selectedRatingMessage = null;  
    }
  }

  checkLogin() {
    let status = localStorage.getItem("login");
    if (!status) {
      alert("Please login to submit feedback.");
      this.feedbackForm.reset();
      this.router.navigateByUrl("/login")
      return;
    }
  }

  submit() {
    console.log(this.feedbackForm);
    
    if (this.feedbackForm.valid) {
      const data = this.feedbackForm.value;
      data.user_id = localStorage.getItem("id");
      console.log(data);
      
      this.http.post("http://localhost:8085/userlogin/postFeedback", data).subscribe({
        next: (res) => {
          console.log(res);
          // this.feedbackForm.clearAsyncValidators
          // this.feedbackForm.reset();
          // console.log(this.feedbackForm);
            this.feedbackForm.get('feedback').reset()
        },
        error: (err) => {
          console.log(err);
          this.feedbackForm.reset();
        }
      });
    }
  }
}
