import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.feedbackForm = this.fb.group({
      user_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      feedback: ['', Validators.required],
      user_id: [1, Validators.required],
      users_ratings: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    // Get the user details from localStorage
    const name = localStorage.getItem("username");
    const email = localStorage.getItem("useremail");

    // Set the form controls with the retrieved values
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

  testimonials = [
    { name: 'John Doe', brand: 'Renault', description: 'I absolutely love my Renault! It\'s comfortable, fuel-efficient, and perfect for city driving.' },
    { name: 'Jane Smith', brand: 'Nissan', description: 'The Nissan car I purchased has amazing features, and I feel safe and confident every time I drive it.' },
    { name: 'Bob Johnson', brand: 'Mitsubishi', description: 'Mitsubishi never disappoints. It\'s powerful and reliable, and I love the off-road capabilities of my vehicle.' },
    { name: 'Alice Brown', brand: 'Renault', description: 'I am so impressed with the smooth driving experience of my Renault. The tech features make driving a joy.' },
    { name: 'Charlie White', brand: 'Nissan', description: 'Nissan cars are known for their reliability, and my experience has been no different. Would recommend to anyone!' },
    { name: 'Diana Green', brand: 'Mitsubishi', description: 'My Mitsubishi SUV is perfect for all my family trips. Great performance and plenty of space.' },
  ];

  ngAfterViewInit() {
    $('#customer-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      items: 3,  // Show 3 items per slide
      responsive: {
        0: {
          items: 1  // 1 item on small screens
        },
        600: {
          items: 2  // 2 items on medium screens
        },
        1000: {
          items: 3  // 3 items on larger screens
        }
      }
    });
  }
}
