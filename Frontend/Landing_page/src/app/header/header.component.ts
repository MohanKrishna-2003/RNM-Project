
import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf and other common directives
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true, // Make it standalone
  imports: [CommonModule,RouterModule], // Include CommonModule to use *ngIf and other directives
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router:Router){}
  isMapVisible = false; // Variable to control the visibility of the map

  toggleMap() {
    this.isMapVisible = !this.isMapVisible; // Toggle map visibility when Location is clicked
  }
  // Variable to toggle the visibility of the profile box
  isProfileBoxVisible = false;

  // Function to toggle the visibility of the profile box
  toggleProfileBox() {
    this.isProfileBoxVisible = !this.isProfileBoxVisible;
  }

  // Function to handle Login
  onLogin() {
    this.router.navigateByUrl("/login")
    console.log('Redirect to Login page');
    
  }

  // Function to handle Sign Up
  onSignup() {
    this.router.navigateByUrl("/signup")
    console.log('Redirect to Signup page');
    
  }
}
