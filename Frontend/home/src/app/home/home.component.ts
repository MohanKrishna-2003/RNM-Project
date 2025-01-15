import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { HeaderComponent } from "../header/header.component";
import { BookingComponent } from "../booking/booking.component";
import { ServiceListComponent } from "../service-list/service-list.component";
import { FooterComponent } from "../footer/footer.component";
import { ContactComponent } from "../contact/contact.component";
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-home',
  standalone:true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [HeaderComponent, BookingComponent, ServiceListComponent, FooterComponent, ContactComponent,FeedbackComponent]
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('carouselExample', { static: false }) carousel!: ElementRef;

  ngAfterViewInit() {
    // Initialize the Bootstrap carousel programmatically with custom options
    const carousel = new bootstrap.Carousel(this.carousel.nativeElement, {
      interval: 3000, // Set custom interval (3 seconds)
      ride: 'carousel', // Enable auto-cycling
    });
  }
}
