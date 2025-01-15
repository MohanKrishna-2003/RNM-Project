import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone:true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  imports: []
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

}
