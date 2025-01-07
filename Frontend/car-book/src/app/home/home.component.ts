import { Component } from '@angular/core';
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true // Marking the component as standalone
  ,
  imports: []
})
export class HomeComponent {
startLiveChat() {
throw new Error('Method not implemented.');
}
  // Your component logic here
}
