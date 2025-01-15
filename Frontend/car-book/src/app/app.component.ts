import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CommonModule } from '@angular/common'; // Required for ngIf, ngFor
import { ServiceComponent } from './service/service.component';

@Component({
  selector: 'app-root',
  standalone: true,  // Indicates this is a standalone component
  imports: [RouterOutlet, RouterModule, CommonModule, LoginComponent, SignupComponent, AdminLoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
