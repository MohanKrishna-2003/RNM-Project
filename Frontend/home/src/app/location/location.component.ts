import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-location',
  standalone:true,
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
  imports: [HeaderComponent]
})
export class LocationComponent {

}
