import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { CommonModule } from '@angular/common';
import { ServiceListComponent } from './Landing Page/service-list/service-list.component';
import { BookingComponent } from './Landing Page/booking/booking.component';
import { FooterComponent } from './Landing Page/footer/footer.component';
import { ContactComponent } from './Landing Page/contact/contact.component';
import { ChatbotComponent } from './Landing Page/chatbot/chatbot.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { CarSelectionComponent } from "./car-selection/car-selection.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
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
  // isOpen=false;

  // openPop(){
  //   this.isOpen=true;
  //   document.body.style.overflow="hidden";

  // }
  // closePop(){
  //   this.isOpen=false;
  //   document.body.style.overflow="auto";
  // }
}
