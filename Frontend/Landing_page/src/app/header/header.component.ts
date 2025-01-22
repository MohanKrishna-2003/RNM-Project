
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf and other common directives
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-header',
  standalone: true, // Make it standalone
  imports: [CommonModule, RouterModule], // Include CommonModule to use *ngIf and other directives
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  name: String='';
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.name = localStorage.getItem("useremail") || "";
  }

  // Variable to toggle the visibility of the profile box
  isProfileBoxVisible = false;

  // Variable to simulate whether the user is logged in (this can be controlled based on your authentication logic)
  isLoggedIn = false;

  // Function to toggle the visibility of the profile box
  toggleProfileBox() {
    this.isProfileBoxVisible = !this.isProfileBoxVisible;
  }

  // Function to handle Login
  onLogin() {
    this.router.navigateByUrl('/login');
    console.log('Redirect to Login page');
  }

  // Function to handle Sign Up
  onSignup() {
    this.router.navigateByUrl('/signup');
    console.log('Redirect to Signup page');
  }
  Onlogout(){
    // localStorage.removeItem("useremail");  
localStorage.clear();
this.name="";
window.location.reload()
  
}
}

