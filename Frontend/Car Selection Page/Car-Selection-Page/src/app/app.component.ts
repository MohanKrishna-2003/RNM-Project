import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CarSelectionComponent } from './car-selection/car-selection.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarSelectionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Car-Selection-Page';

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.document.documentElement.scrollTop = 0; 
        this.document.body.scrollTop = 0; 
      }
    });
    
    window.onload = () => {
      this.document.documentElement.scrollTop = 0;
      this.document.body.scrollTop = 0;
    };
  }
}
