import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LocationComponent } from '../location/location.component';

@Component({
  selector: 'app-home-location',
  imports: [HeaderComponent, FooterComponent, LocationComponent],
  templateUrl: './home-location.component.html',
  styleUrl: './home-location.component.css',
})
export class HomeLocationComponent {}
