import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { BookingComponent } from "../booking/booking.component";
import { ServiceListComponent } from "../service-list/service-list.component";
import { FooterComponent } from "../footer/footer.component";
import { ContactComponent } from "../contact/contact.component";
import { FeedbackComponent } from '../feedback/feedback.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { LogoComponent } from '../logo/logo.component';
import { NewsComponent } from '../news/news.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [HeaderComponent, FeedbackComponent, BookingComponent, TestimonialComponent, ServiceListComponent, FooterComponent, ContactComponent, LogoComponent, NewsComponent]
})
export class HomeComponent {
  // No need for AfterViewInit or ViewChild anymore, as no interactivity is needed
}
