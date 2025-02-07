import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private defaultAdmin = { username: 'admin', password: '12345' };

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username.trim() === this.defaultAdmin.username && password.trim() === this.defaultAdmin.password) {
      localStorage.setItem('isLoggedIn', 'true');
      console.log('Login exitoso, isLoggedIn guardado en localStorage.');
      return true;
    }
    console.log('Login fallido.');
    return false;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const status = localStorage.getItem('isLoggedIn') === 'true';
    console.log('AuthService: Estado de sesión:', status);
    return status;
  }
}
