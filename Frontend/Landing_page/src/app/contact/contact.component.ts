import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component  , } from '@angular/core';
import { FormGroup,ReactiveFormsModule,FormsModule ,FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
   
   contact: FormGroup;
   constructor(private http: HttpClient, private fb: FormBuilder) {
    this.contact = this.fb.group({
      name: ['',[Validators.maxLength(20),Validators.minLength(4)]],
      email: ['',[Validators.email]],
      message: ['',[Validators.maxLength(100),Validators.required]]
    });
  }
  
  onsubmit() {
   
    if (this.contact.valid) {
      const data = this.contact.value;
      console.log('Form Data:', data);

      this.http.post('http://localhost:8080/contact/postcontact', data).subscribe(
        (response: any) => {
          console.log('Form Submitted Successfully:', response);
          alert("Form Submitted Succesfully. We will reach out to you soon !!")
          window.location.reload();

        },
        (error) => {
          console.error('Error occurred while submitting form:', error);
        }
      );
    } 
  }
  }
  


