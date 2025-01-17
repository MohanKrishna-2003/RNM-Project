import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone:true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  imports: [ReactiveFormsModule , FormsModule,CommonModule  ]
})
export class ContactComponent {
  contact={
    name:'',
    email:'',
    message:''
  };
  feedbackForm:FormGroup
  constructor(private http:HttpClient,private fb:FormBuilder){
    this.feedbackForm = this.fb.group({
      user_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      feedback: ['', Validators.required],
      user_id: [1, Validators.required]
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

  checkLogin() {
    let status = localStorage.getItem("login");
    if (!status) {
      console.log(status);
      alert("Please login to submit feedback.");
      this.feedbackForm.reset();
      return;
    }
  }

  submit(){
      // let status = localStorage.getItem("login");
      // if(status != "1"){
      //   alert("Pls login");
      //   return;
      // }

    if(this.feedbackForm.valid){
      const data =this.feedbackForm.value;
      console.log(data);
      data.user_id = localStorage.getItem("id");
      
      this.http.post("http://localhost:8085/userlogin/postFeedback",data).subscribe({
        next:(res)=>{
          console.log(res);
          this.feedbackForm.reset();
        },error:(err)=>{
          console.log(err);
          this.feedbackForm.reset();
        }
      })
    }
   
  }
  onsubmit(){
    console.log('Form submitted:',this.contact);
    //add form submitted logic here(e.g.,HTTP request)
  }

}














// checkLogin() {
//   let status = localStorage.getItem("login");
//   if (!status) {
//     console.log(status);
    
//     alert("Please login to submit feedback.");
//     this.feedbackForm.reset();  
//     return;
//   }
// }