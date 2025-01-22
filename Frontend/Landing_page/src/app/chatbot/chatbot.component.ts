import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  standalone:true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  // Array of options for the main menu
  options: string[] = [
    'What is your name?',
    'What can you do?',
    'Book a Test Drive',
    'feedback',
    'Locations',
    'News',
    'Goodbye!',
  ];

  // Messages array to store user and bot messages
  messages: { sender: string, text: string }[] = [];

  // Flags to control UI flow
  isChatOpen: boolean = false;

  // Variables to store dynamic content (e.g., car info, booking details)
  carDetails: string | null = null;
  bookingDetails: string | null = null;

  constructor(private router: Router) { }

  // Toggle chat window visibility
  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  // Handle option selected by the user
  onOptionSelected(option: string): void {
    this.messages.push({ sender: 'user', text: option });

    if (option === 'Book a test drive') {
      this.router.navigate(['/booking']);
    }  else if (option === 'feedback') {
      this.router.navigate(['/feedback']);
      this.messages.push({ sender: 'bot', text: 'Redirecting to the feedback page.' });
    } else if (option === 'Locations') {
      this.router.navigate(['/location']); // Navigate to the locations page
      this.messages.push({ sender: 'bot', text: 'Redirecting to the locations page.' });
    }
    else if (option === 'News') {
      this.router.navigate(['/news']); // Navigate to the testimonials page
      this.messages.push({ sender: 'bot', text: 'Redirecting to the testimonials page.' });
    }else {
      const botReply = this.getBotResponse(option);
      this.messages.push({ sender: 'bot', text: botReply });
    }
  }

  // Get bot's response based on user input
  getBotResponse(option: string): string {
    switch (option) {
      case 'What is your name?':
        return 'I am a chatbot created to help you book test drives, learn about cars, and much more!';
      case 'What can you do?':
        return 'I can assist you with booking a test drive, telling you about our cars, showing customer reviews, and more!';
      case 'Goodbye!':
        return 'Goodbye! Hope to assist you again soon. Have a safe drive!';
      default:
        return 'Sorry, I didn’t understand that. Can you please choose from the available options?';
    }
  }

  // Set dynamic car details (from Home component)
  setCarDetails(carDetails: string): void {
    this.carDetails = carDetails;
  }

  // Set dynamic booking details (from Home component)
  setBookingDetails(bookingDetails: string): void {
    this.bookingDetails = bookingDetails;
  }
}
