import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private API_URL = "https://newsapi.org/v2/everything?q=Renault+Nissan&language=en&sortBy=publishedAt";
  private API_KEY = "03236fd20cc54cabac03280adfa33aaa"; // Use your actual API key here

  constructor(private http: HttpClient) { }

  // Fetch news articles related to Renault Nissan
  getNews(): Observable<any> {
    const url = `${this.API_URL}&apiKey=${this.API_KEY}`;
    return this.http.get<any>(url);
  }
}
