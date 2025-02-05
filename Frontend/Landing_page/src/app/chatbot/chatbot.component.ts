import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})

export class ChatbotComponent implements OnInit {
  form = new FormGroup({
    message: new FormControl(''),
  });

  options: string[] = [];
  messages: { sender: string, text: string, isSpecial?: boolean }[] = []; // Added `isSpecial` flag
  isLoading = false;
  isChatOpen: boolean = false;
  isOnPage: boolean = false; // Flag to track if the user has navigated to a page

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Initial greeting and options
    this.messages.push({ sender: 'bot', text: 'Hi, I am a chatbot. How can I assist you today?',isSpecial: true });

    this.options = [
      'What is your name?',
      'What can you do?',
      'Learn About Cars',
      'Book a Test Drive',
      'Feedback',
      'Locations',
      'News',
      'Goodbye!'
    ];
  }

  // Toggle the chat window open or closed
  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    const userMessage = this.form.controls.message.value;
    if (userMessage) {
      // Check if the message is a predefined option
      if (this.options.includes(userMessage)) {
        // If it's an option, skip adding the user's message and directly handle the option
        this.onOptionSelected(userMessage);
      } else {
        // Otherwise, show the user's message (for custom messages)
        this.messages.push({ sender: 'user', text: userMessage });
        this.generateBotResponse(userMessage); // Handle custom messages
      }
    }

    // Reset the form input after sending
    this.form.reset();
  }


  onOptionSelected(option: string): void {
    this.messages.push({ sender: 'option', text: option }); // Add option as a message with sender "option"
    if (option === 'What is your name?') {
      this.messages.push({ sender: 'bot', text: 'My name is MyRnm, how can I assist you?', isSpecial: true }); // Special message
    } else if (option === 'What can you do?') {
      this.messages.push({ sender: 'bot', text: 'I can help you with booking a test drive, provide information about cars, and more!', isSpecial: true }); // Special message
    } else if (option === 'Learn About Cars') {
      this.router.navigate(['/booking']);
      this.isOnPage = true;
      this.messages.push({ sender: 'bot', text: 'Redirecting to the booking page.',isSpecial: true });
    } else if (option === 'Book a Test Drive') {
      this.router.navigate(['/booking']);
      this.isOnPage = true;
      this.messages.push({ sender: 'bot', text: 'Redirecting to the booking page.',isSpecial: true });
    } else if (option === 'Feedback') {
      this.router.navigate(['/feedback']);
      this.isOnPage = true;
      this.messages.push({ sender: 'bot', text: 'Redirecting to the feedback page.',isSpecial: true });
    } else if (option === 'Locations') {
      this.router.navigate(['/location']);
      this.isOnPage = true;
      this.messages.push({ sender: 'bot', text: 'Redirecting to the locations page.',isSpecial: true });
    } else if (option === 'News') {
      this.router.navigate(['/news']);
      this.isOnPage = true;
      this.messages.push({ sender: 'bot', text: 'Redirecting to the news page.',isSpecial: true });
    } else if (option === 'Goodbye!') {
      this.messages.push({ sender: 'bot', text: 'Goodbye! Hope to assist you again soon. Have a safe drive!',isSpecial: true });
    } else {
      this.generateBotResponse(option); // Custom message handling
    }
  }

  // API call to generate bot's response for custom messages
  generateBotResponse(userMessage: string) {
    this.isLoading = true;

    const data = {
      contents: [
        {
          parts: [{ text: userMessage }],
        },
      ],
    };

    // Replace with your actual API endpoint and key
    this.http.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAiyjwYVl2IuMG1T_DjKX6LuS8WiHtXeG4', data)
      .subscribe(
        (res: any) => {
          this.isLoading = false;

          // Ensure the response structure is correct
          if (res && res.candidates && res.candidates[0] && res.candidates[0].content && res.candidates[0].content.parts[0]) {
            const responseText = res.candidates[0].content.parts[0].text;
            this.messages.push({ sender: 'bot', text: responseText });
          } else {
            this.messages.push({ sender: 'bot', text: 'Sorry, I could not understand your request.' });
          }
        },
        (err: any) => {
          this.isLoading = false;
          this.messages.push({ sender: 'bot', text: 'Something went wrong. Please try again later.' });
        }
      );
  }

  // Go Back to previous page
  goBack() {
    this.router.navigate(['/']);
    this.isOnPage = false;
    this.messages.push({ sender: 'bot', text: 'You are now back to the chat. How can I help you further?' });
  }
}
