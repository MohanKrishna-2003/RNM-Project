import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselModule,CarouselComponent } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-testimonial',
  imports: [CommonModule,CarouselModule],
  standalone:true,
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent implements OnInit{
  testimonials: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("http://localhost:8080/user/getUsersFeedback").subscribe((res: any) => {
      console.log(res);
      this.testimonials = res.slice(0, 10);  // Limit to 10 testimonials
      console.log(this.testimonials);
    });
  }

  carouselOptions = {
    loop: true,
    margin: 10,
    nav: false, // Disable default navigation
    dots: true,
    autoplay: true,
    autoplayTimeout: 4000, // Increase this value to slow down the carousel
    autoplaySpeed: 800, // Adjust this for slower transitions between slides
    items: 3,
    responsive: {
      0: {
        items: 1  // 1 item on small screens
      },
      600: {
        items: 2  // 2 items on medium screens
      },
      1000: {
        items: 4  // 4 items on larger screens
      }
    },
    autoplayHoverPause: true // Pause on hover
  };


}

