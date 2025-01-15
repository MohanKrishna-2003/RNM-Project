
import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf and other common directives
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true, // Make it standalone
  imports: [CommonModule,RouterModule], // Include CommonModule to use *ngIf and other directives
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
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
    console.log('Redirect to Login page');
    // You can navigate to a login page using the Angular router
    // this.router.navigate(['/login']);
  }

  // Function to handle Sign Up
  onSignup() {
    console.log('Redirect to Signup page');
    // You can navigate to a signup page using the Angular router
    // this.router.navigate(['/signup']);
  }
}
