import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private defaultAdmin = { username: 'admin', password: '12345' };

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    console.log('Usuario ingresado:', username, '| Contraseña ingresada:', password);
    console.log('Usuario esperado:', this.defaultAdmin.username, '| Contraseña esperada:', this.defaultAdmin.password);

    if (username.trim() === this.defaultAdmin.username && password.trim() === this.defaultAdmin.password) {
      this.isAuthenticated = true;
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
