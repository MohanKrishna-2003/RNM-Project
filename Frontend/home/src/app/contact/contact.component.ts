import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone:true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  imports: [ReactiveFormsModule,FormsModule,CommonModule]
})
export class ContactComponent {
  contact={
    name:'',
    email:'',
    message:''
  };
  onsubmit(){
    console.log('Form submitted:',this.contact);
    //add form submitted logic here(e.g.,HTTP request)
  }
  feedbackForm:FormGroup
    constructor(private http:HttpClient,private fb:FormBuilder){
      this.feedbackForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        feedback: ['', Validators.required]
      });
    }
    submit(){}

}
