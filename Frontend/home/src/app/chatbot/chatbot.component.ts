<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone:true,
  imports: [CommonModule,FormsModule],
=======
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
>>>>>>> f2ac65f4b7d918fb402144fb2282bfa5130c9e32
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit {
  chatMessages: { type: string, text: string, isTyping?: boolean }[] = [];
  userInput: string = '';
  quickReplies: string[] = ['What is your name?', 'Tell me about your services', 'How can I contact you?'];
<<<<<<< HEAD

  constructor() { }
=======
  isChatVisible: boolean = true; // To toggle visibility of the chatbot

  constructor() {}
>>>>>>> f2ac65f4b7d918fb402144fb2282bfa5130c9e32

  ngOnInit(): void {
    this.greetUser();
  }

  greetUser(): void {
    const hours = new Date().getHours();
    let greeting = 'Hello! How can I assist you today?';

    if (hours < 12) {
      greeting = 'Good Morning! How can I help you today?';
    } else if (hours < 18) {
      greeting = 'Good Afternoon! What can I do for you?';
    } else {
      greeting = 'Good Evening! Let me know if you need any help.';
    }

    this.chatMessages.push({ type: 'bot', text: greeting });
  }

  sendMessage(): void {
    if (this.userInput.trim()) {
      this.chatMessages.push({ type: 'user', text: this.userInput });
      this.userInput = '';

      this.chatMessages.push({ type: 'bot', text: '', isTyping: true });
      this.scrollToBottom();

      setTimeout(() => {
        this.chatMessages[this.chatMessages.length - 1].isTyping = false;
        this.botRespond();
      }, 1500);
    }
  }

  botRespond(): void {
    const userMessage = this.chatMessages[this.chatMessages.length - 2].text.toLowerCase();
    let botResponse = '';

    if (userMessage.includes('hello') || userMessage.includes('hi')) {
      botResponse = 'Hello! How can I assist you today?';
    } else if (userMessage.includes('weather')) {
      botResponse = 'The weather today is sunny with a slight breeze.';
    } else if (userMessage.includes('location')) {
      botResponse = 'We are located at XYZ street, City Center.';
    } else {
      botResponse = 'I am sorry, I did not understand that.';
    }

    this.chatMessages.push({ type: 'bot', text: botResponse });
    this.scrollToBottom();
  }

  quickReply(reply: string): void {
    this.chatMessages.push({ type: 'user', text: reply });
    setTimeout(() => {
      this.chatMessages.push({ type: 'bot', text: `You selected: ${reply}` });
      this.scrollToBottom();
    }, 1000);
  }

<<<<<<< HEAD
=======
  toggleChatVisibility(): void {
    this.isChatVisible = !this.isChatVisible;
  }

>>>>>>> f2ac65f4b7d918fb402144fb2282bfa5130c9e32
  scrollToBottom(): void {
    const messageContainer = document.getElementById('messages');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }
}
