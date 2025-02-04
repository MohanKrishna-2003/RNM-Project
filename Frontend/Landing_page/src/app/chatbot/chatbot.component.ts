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

  options: string[] = [
    'What is your name?',
    'What can you do?',
    'Learn About Cars',
    'Book a Test Drive',
    'Feedback',
    'Locations',
    'News',
    'Goodbye!',
  ];

  messages: { sender: string, text: string | any }[] = [];
  isLoading = false;
  isChatOpen: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Initial setup if needed
  }

  // Toggle the chat window open or closed
  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  // Send a message, either from predefined options or custom message
  sendMessage() {
    const userMessage = this.form.controls.message.value;
    if (userMessage) {
      this.messages.push({ sender: 'user', text: userMessage });
    }

    // Reset the form input after sending
    this.form.reset();

    // Handle predefined options or custom message
    this.onOptionSelected(userMessage); // This will handle predefined options or custom message
  }

  // Handle selected options or custom messages
  onOptionSelected(option: string): void {
    // Don't add the message again here as it was already added in sendMessage()
    if (option === 'Learn About Cars') {
      this.router.navigate(['/booking']);
      this.messages.push({ sender: 'bot', text: 'Redirecting to the booking page.' });
    } else if (option === 'Book a Test Drive') {
      this.router.navigate(['/booking']);
      this.messages.push({ sender: 'bot', text: 'Redirecting to the booking page.' });
    } else if (option === 'Feedback') {
      this.router.navigate(['/feedback']);
      this.messages.push({ sender: 'bot', text: 'Redirecting to the feedback page.' });
    } else if (option === 'Locations') {
      this.router.navigate(['/location']);
      this.messages.push({ sender: 'bot', text: 'Redirecting to the locations page.' });
    } else if (option === 'News') {
      this.router.navigate(['/news']);
      this.messages.push({ sender: 'bot', text: 'Redirecting to the news page.' });
    } else if (option === 'Goodbye!') {
      this.messages.push({ sender: 'bot', text: 'Goodbye! Hope to assist you again soon. Have a safe drive!' });
    } else {
      // Custom message, generate bot response via API
      this.generateBotResponse(option);
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
}
