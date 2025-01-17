import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export class ContactComponent implements OnInit {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  feedbackForm: FormGroup;
  articles: any[] = [];
  currentIndex: number = 3;  // Initially load 3 articles (1 row)
  loading: boolean = false;

  readonly DEFAULT_IMAGE = 'defaulticonnews.jpg';
  readonly ARTICLES_PER_LOAD = 3; // Load 3 articles per "Load More"
  readonly INITIAL_LOAD = 3; // Initially show 3 articles (1 row)

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.feedbackForm = this.fb.group({
      user_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      feedback: ['', Validators.required],
      user_id: [1, Validators.required] // Assuming user_id is 1 for now, adjust as needed
    });
  }
  ngOnInit(): void {
    // Get the user details from localStorage
    const name = localStorage.getItem("username");
    const email = localStorage.getItem("useremail");

    // Set the form controls with the retrieved values
    if (name) {
      this.feedbackForm.patchValue({
        user_name: name
      });
    }

    if (email) {
      this.feedbackForm.patchValue({
        user_email: email
      });
    }
  }

  checkLogin() {
    let status = localStorage.getItem("login");
    if (!status) {
      console.log(status);
      alert("Please login to submit feedback.");
      this.feedbackForm.reset();
      return;
    }
  }

  submit(){
      // let status = localStorage.getItem("login");
      // if(status != "1"){
      //   alert("Pls login");
      //   return;
      // }

    if(this.feedbackForm.valid){
      const data =this.feedbackForm.value;

  ngOnInit(): void {
    this.fetchNews();  // Fetch news articles on initialization
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
    // Only slice articles up to the current index to ensure we display the right amount
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
    setTimeout(() => {
      this.displayNews(false);  // Load next set of articles
      this.loading = false;
    }, 1000);  // Simulate a short delay
  }

  // Submit the feedback form data to the API
  submit(): void {
    const status = localStorage.getItem("login"); // Check login status
    if (status !== "1") {
      alert("Please login to submit feedback");
      return; // Don't proceed if the user is not logged in
    }

    if (this.feedbackForm.valid) {
      const data = this.feedbackForm.value;
      console.log(data);

      this.http.post("http://localhost:8085/userlogin/postFeedback",data).subscribe({
        next:(res)=>{
          console.log(res);

        },error:(err)=>{
          console.log(err);

        }
      })
    }

  }
  onsubmit(){
    console.log('Form submitted:',this.contact);
    //add form submitted logic here(e.g.,HTTP request)
  }

}














// checkLogin() {
//   let status = localStorage.getItem("login");
//   if (!status) {
//     console.log(status);

//     alert("Please login to submit feedback.");
//     this.feedbackForm.reset();
//     return;
//   }
// }
