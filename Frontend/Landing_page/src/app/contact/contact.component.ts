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
  submit(){
    if(this.feedbackForm.valid){
      const data =this.feedbackForm.value;
      console.log(data);
      
      this.http.post("http://localhost:8080/feedback/postFeedback",data).subscribe({
        next:(res)=>{
          console.log(res);
          
        },error:(err)=>{
          console.log(err);
          
        }
      })
    }
   
  }
  onsubmit(){
    console.log('Form submitted:',this.contact);
    //add form submitted logic here(e.g.,HTTP request)
  }

}
