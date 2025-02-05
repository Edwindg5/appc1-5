import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './register-user.component.html',
})
export class RegisterUserComponent {
  user: User = { name: '', email: '', password: '' };

  constructor(private userService: UserService, private router: Router) {}

  register() {
    if (!this.user.name || !this.user.email || !this.user.password) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    this.userService.registerUser(this.user).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Registro exitoso!',
          text: 'El usuario ha sido registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // Limpiar formulario después de cerrar el alerta
          this.user = { name: '', email: '', password: '' };
        });
      },
      error: (error) => {
        Swal.fire('Error', 'Hubo un problema al registrar el usuario', 'error');
        console.error('Error al registrar usuario', error);
      }
    });
  }
}
