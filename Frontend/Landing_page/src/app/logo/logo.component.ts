import { Component } from '@angular/core';
import { ChatComponent } from "../chat/chat.component";

@Component({
  selector: 'app-logo',
  imports: [ChatComponent],
  standalone:true,
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent {

}
