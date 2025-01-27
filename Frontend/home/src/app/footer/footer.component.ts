import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone:true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear(); // Get current year
  }

  ngOnInit(): void {
    // Any other initialization logic if needed
  }

}
 