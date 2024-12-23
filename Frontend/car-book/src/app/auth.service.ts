
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false; // Default to not logged in

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  // Log the user in
  login(email: string, password: string) {
    this.loggedIn = true;
  }

  // Log the user out
  logout() {
    this.loggedIn = false;
  }
}
