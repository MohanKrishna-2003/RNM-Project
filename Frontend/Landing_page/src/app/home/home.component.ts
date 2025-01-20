import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { HeaderComponent } from "../header/header.component";
import { BookingComponent } from "../booking/booking.component";
import { ServiceListComponent } from "../service-list/service-list.component";
import { FooterComponent } from "../footer/footer.component";
import { ContactComponent } from "../contact/contact.component";
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { H1Component } from "../h1/h1.component";

@Component({
  selector: 'app-home',
  standalone:true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [HeaderComponent, BookingComponent, ServiceListComponent, FooterComponent, ContactComponent, ChatbotComponent, H1Component]
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('carouselExample', { static: false }) carousel!: ElementRef;
  @ViewChild(ChatbotComponent) chatbotComponent!: ChatbotComponent;

  ngAfterViewInit() {
    // Initialize the Bootstrap carousel programmatically with custom options
    const carousel = new bootstrap.Carousel(this.carousel.nativeElement, {
      interval: 3000, // Set custom interval (3 seconds)
      ride: 'carousel', // Enable auto-cycling
    });

    // Trigger chatbot response based on carousel change
    this.carousel.nativeElement.addEventListener('slide.bs.carousel', (event: any) => {
      // For example, you can show the car details when the carousel changes
      const carDetails = this.getCarDetails(event);
      this.chatbotComponent.setCarDetails(carDetails);
    });
  }

  // Get car details based on the current carousel item
  getCarDetails(event: any): string {
    const carouselIndex = event.to; // The index of the active carousel item
    switch (carouselIndex) {
      case 0:
        return 'This is the Mitsubishi XForce, a stylish and powerful SUV!';
      case 1:
        return 'This is a beautiful shot of a Nissan X-Trail. Great for family trips!';
      case 2:
        return 'Here we have a Nissan X-Trail. Known for its rugged performance.';
      default:
        return '';
    }
  }

  // Trigger booking details in the chatbot (e.g., when the user asks about booking)
  onBookingQuery(): void {
    const bookingDetails = 'You can book your services directly through our website or app.';
    this.chatbotComponent.setBookingDetails(bookingDetails);
  }
}
