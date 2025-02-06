import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './register-user.component.html',
})
export class RegisterUserComponent {
  user = { name: '', email: '', password: '' };

  constructor(private userService: UserService) {}

  register() {
    if (!this.user.name || !this.user.email || !this.user.password) {
      Swal.fire({
        icon: 'error',
        title: '¡Oops!',
        html: '<b>Todos los campos son obligatorios</b>',
        confirmButtonColor: '#ff4d4d',
        background: '#222',
        color: '#fff',
        showClass: {
          popup: 'animate__animated animate__shakeX' // Efecto de temblor
        }
      });
      return;
    }

    // Alerta de carga con animación circular
    Swal.fire({
      title: 'Registrando usuario...',
      html: `<div class="swal2-loading-animation"></div><p>Espera un momento...</p>`,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      background: '#222',
      color: '#fff',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setTimeout(() => {
      this.userService.registerUser(this.user).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            html: '<b>El usuario ha sido registrado correctamente.</b>',
            showConfirmButton: false,
            timer: 2000,
            background: '#1e293b',
            color: '#fff',
            backdrop: `
              rgba(0,0,0,0.8)
              url("https://i.gifer.com/7efs.gif")  // Fondo animado
              center/cover no-repeat
            `,
            showClass: {
              popup: 'animate__animated animate__bounceIn' // Efecto rebote
            }
          });

          // Limpiar formulario sin redirigir
          this.user = { name: '', email: '', password: '' };
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            html: '<b>No se pudo registrar el usuario.</b>',
            confirmButtonColor: '#ff4d4d',
            background: '#222',
            color: '#fff',
            showClass: {
              popup: 'animate__animated animate__shakeX' // Efecto de temblor
            }
          });
          console.error('Error al registrar usuario', error);
        }
      });
    }, 3000); // Simulación de espera de 3 segundos antes de llamar a la API
  }
}
