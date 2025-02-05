import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',

})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('Intentando iniciar sesión con:', this.username, this.password);

    if (!this.username || !this.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor, ingresa usuario y contraseña.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    if (this.authService.login(this.username, this.password)) {
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Inicio de sesión exitoso.',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigate(['/home']);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos.',
        confirmButtonColor: '#d33'
      });
    }
  }
}
