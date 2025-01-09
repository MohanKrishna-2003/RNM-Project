import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { CommonModule } from '@angular/common';
import { ServiceListComponent } from "./service-list/service-list.component";
import { BookingComponent } from "./booking/booking.component";
import { FooterComponent } from "./footer/footer.component";
import { ContactComponent } from "./contact/contact.component";

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [HeaderComponent, CommonModule, RouterModule, FooterComponent, ServiceListComponent, HomeComponent, BookingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showServiceList: boolean = false;
  showContact: boolean = false;

  constructor(private router: Router) {
    // Listen for route changes and set the flags accordingly
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showServiceList = event.url.includes('/service');
        this.showContact = event.url.includes('/contact');
      }
    });
  }
}
