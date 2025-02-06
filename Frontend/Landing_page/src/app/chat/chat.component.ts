import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone:true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  form = new FormGroup({
    message: new FormControl(''),
  });

  messages: { sender: string; text: string | any }[] = [];
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Initial setup if needed
  }

  sendMessage() {
    const userMessage = this.form.controls.message.value;
    this.messages.push({ sender: 'user', text: userMessage });

    // Check if the message is an option or a command
    this.onOptionSelected(userMessage);

    this.form.reset(); // Reset input field after sending
  }

  // Handle option selected by the user
  onOptionSelected(option: string): void {
    this.messages.push({ sender: 'user', text: option });

    if (option === 'Learn About Cars') {
      this.router.navigate(['/booking']);
    } else if (option === 'Book a Test Drive') {
      this.router.navigate(['/booking']); // Navigate to the booking page
      this.messages.push({ sender: 'bot', text: 'Redirecting to the booking page.' });
    } else if (option === 'Feedback') {
      this.router.navigate(['/feedback']);
      this.messages.push({ sender: 'bot', text: 'Redirecting to the feedback page.' });
    } else if (option === 'Locations') {
      this.router.navigate(['/location']); // Navigate to the locations page
      this.messages.push({ sender: 'bot', text: 'Redirecting to the locations page.' });
    } else if (option === 'News') {
      this.router.navigate(['/news']); // Navigate to the news page
      this.messages.push({ sender: 'bot', text: 'Redirecting to the news page.' });
    } else {
      // If it's not a predefined option, generate a response using the API
      this.generateBotResponse(option);
    }
  }

  generateBotResponse(userMessage: string) {
    this.isLoading = true;

    const data ={
      contents: [
        {
          parts: [{ text:userMessage }],
        },
      ],
    };

    this.http.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAiyjwYVl2IuMG1T_DjKX6LuS8WiHtXeG4', data)
      .subscribe(
        (res: any) => {
          this.isLoading = false;
          console.log(res);

          // Check if the response structure is as expected
          if (res && res.candidates && res.candidates[0] && res.candidates[0].content && res.candidates[0].content.parts[0]) {
            const responseText = res.candidates[0].content.parts[0].text;
            this.messages.push({ sender: 'bot', text: responseText });
          } else {
            this.messages.push({ sender: 'bot', text: 'Sorry, I could not understand your request.' });
          }
        },
        (err: any) => {
          this.isLoading = false;
          console.error('Error details:', err.error);
          console.error('Response Status:', err.status);
          console.error('Response Message:', err.statusText);
          this.messages.push({ sender: 'bot', text: 'Something went wrong. Please try again later.' });
        }
      );
  }

}
