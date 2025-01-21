import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-news',
  standalone: true,
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export class NewsComponent implements OnInit {
  articles: any[] = [];
  currentIndex: number = 3;  // Initially load 3 articles (1 row)
  loading: boolean = false;

  readonly DEFAULT_IMAGE = 'defaulticonnews.jpg';
  readonly ARTICLES_PER_LOAD = 3; // Load 3 articles per "Load More"
  readonly INITIAL_LOAD = 3; // Initially show 3 articles (1 row)

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  // News API URL
  private API_URL = 'https://newsapi.org/v2/everything?q=Renault+Nissan+Mitsubishi&language=en&sortBy=publishedAt&apiKey=03236fd20cc54cabac03280adfa33aaa';

  // Fetch news from API
  fetchAPI(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  // Fetch news articles
  fetchNews(): void {
    this.fetchAPI().subscribe(
      (data) => {
        this.articles = data.articles;
        this.displayNews(true); // Load only 3 articles initially (1 row)
      },
      (error) => {
        console.error('Error fetching news:', error);
      }
    );
  }

  // Display news articles (only 1 row initially)
  displayNews(isInitialLoad: boolean = false): void {
    const numArticles = isInitialLoad ? this.INITIAL_LOAD : this.ARTICLES_PER_LOAD;
    const nextArticles = this.articles.slice(0, this.currentIndex);

    // Update the currentIndex so that we can load more articles later
    if (isInitialLoad) {
      this.currentIndex = numArticles;
    } else {
      this.currentIndex += numArticles;
    }

    // Hide the "Load More" button when all articles are displayed
    if (this.currentIndex >= this.articles.length) {
      const loadMoreBtn = document.getElementById('loadMoreBtn');
      if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
      }
    }
  }

  // Handle the "Load More" button click
  loadMore(): void {
    this.loading = true;
    // Show the spinner when loading starts
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
      loadingSpinner.style.display = 'block';
    }

    setTimeout(() => {
      this.displayNews(false);  // Load next set of articles
      this.loading = false;

      // Hide the spinner once loading is complete
      if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
      }
    }, 1000);  // Simulate a short delay
  }
}
