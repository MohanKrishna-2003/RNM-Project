import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { CommonModule } from '@angular/common';
import { ServiceListComponent } from "./service-list/service-list.component";
import { BookingComponent } from "./booking/booking.component";
import { FooterComponent } from "./footer/footer.component";
import { ContactComponent } from "./contact/contact.component";
import { ChatbotComponent } from "./chatbot/chatbot.component";
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [HeaderComponent, CommonModule, RouterModule, FooterComponent, HomeComponent, BookingComponent, ContactComponent, ChatbotComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Variable to control visibility of chatbot
  isChatbotVisible: boolean = false;

  // Scroll to top function
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // Show the button when scrolling down
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
      // Show button if the scroll position is more than 200px
      if (window.scrollY > 200) {
        scrollToTopBtn.classList.add('show-scroll-btn');
      } else {
        scrollToTopBtn.classList.remove('show-scroll-btn');
      }
    }
  }

  // Toggle the visibility of the chatbot
  toggleChatbot(): void {
    this.isChatbotVisible = !this.isChatbotVisible;
  }
}
