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
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor, ingresa usuario y contraseña.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    this.isLoading = true; // Inicia el estado de carga

    setTimeout(() => {
      if (this.authService.login(this.username, this.password)) {
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido Administrador!',
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
      this.isLoading = false; // Detiene la carga después de la autenticación
    }, 2000); // Simula un tiempo de espera de 2 segundos
  }
}
