import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This ensures BotService is available globally
})
export class BotService {
  private apiUrl = 'http://localhost:8080/api/bot';  // Change this to your actual backend URL

  constructor(private http: HttpClient) {}

  // Send a message to the backend and get the bot's response
  getBotResponse(userInput: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}?message=${encodeURIComponent(userInput)}`);
  }
}
