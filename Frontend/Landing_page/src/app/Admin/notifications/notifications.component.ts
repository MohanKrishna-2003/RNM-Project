import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule, AdminHeaderComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  articles: any[] = [];
  currentIndex: number = 0;
  loading: boolean = false;

  readonly DEFAULT_IMAGE = 'defaulticonnews.jpg';
  readonly ARTICLES_PER_LOAD = 3;
  readonly INITIAL_LOAD = 9;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchNews();
  }
  private API_URL =
    'https://newsapi.org/v2/everything?q=Renault+Nissan+Mitsubishi&language=en&sortBy=publishedAt&apiKey=03236fd20cc54cabac03280adfa33aaa';
  fetchAPI(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }
  // Fetch news articles
  fetchNews(): void {
    this.fetchAPI().subscribe(
      (data) => {
        this.articles = data.articles;
        this.displayNews(true); // Load initial articles
      },
      (error) => {
        console.error('Error fetching news:', error);
      }
    );
  }

  // Display news articles
  displayNews(isInitialLoad: boolean = false): void {
    const numArticles = isInitialLoad
      ? this.INITIAL_LOAD
      : this.ARTICLES_PER_LOAD;
    const nextArticles = this.articles.slice(
      this.currentIndex,
      this.currentIndex + numArticles
    );

    // Update the displayed news
    this.currentIndex += numArticles;

    if (this.currentIndex >= this.articles.length) {
      // Hide the "Load More" button when all articles are displayed
      const loadMoreBtn = document.getElementById('loadMoreBtn');
      if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
      }
    }
  }

  // Handle the "Load More" button click
  loadMore(): void {
    this.loading = true;
    setTimeout(() => {
      this.displayNews(false);
      this.loading = false;
    }, 3000);
  }
}
