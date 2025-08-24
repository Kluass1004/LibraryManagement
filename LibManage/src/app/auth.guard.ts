import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Example: check if token exists in localStorage
    const login = localStorage.getItem('isLoggedIn');

    if (login) {
      return true; // allow access
    } else {
      // redirect to login if not logged in
      this.router.navigate(['/home']);
      return false;
    }
  }
}
