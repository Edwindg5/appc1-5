import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('AuthGuard: Verificando si el usuario está autenticado...');
    
    if (this.authService.isLoggedIn()) {
      console.log('AuthGuard: Usuario autenticado. Acceso permitido.');
      return true;
    }

    console.log('AuthGuard: Usuario NO autenticado. Redirigiendo a /login...');
    this.router.navigate(['/login']);
    return false;
  }
}
