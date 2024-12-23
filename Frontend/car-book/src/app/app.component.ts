import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, LoginComponent, SignupComponent, AdminLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
