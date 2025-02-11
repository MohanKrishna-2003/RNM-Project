import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface BotResponse {
  reply: string;
}

interface TestDriveBookingResponse {
  carModel: string;
  date: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'http://localhost:3000/getBotResponse';  // Your backend API URL for getting bot responses
  private testDriveUrl = 'http://localhost:3000/bookTestDrive';  // Your backend API URL for booking test drives

  constructor(private http: HttpClient) { }

  // Get the bot's response to the user's message
  getBotResponse(userMessage: string): Observable<BotResponse> {
    return this.http.post<BotResponse>(this.apiUrl, { message: userMessage });
  }

  // Book a test drive
  bookTestDrive(carModel: string, date: string): Observable<TestDriveBookingResponse> {
    return this.http.post<TestDriveBookingResponse>(this.testDriveUrl, { carModel, date });
  }
}
