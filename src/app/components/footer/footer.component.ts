import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  constructor(private router: Router, private authService: AuthService) {}

  mostrarAyuda() {
    Swal.fire({
      title: '¿Cómo funciona nuestra plataforma?',
      html: `
        <p class="text-gray-700 text-lg">
          Segunda Mano UP es una plataforma donde puedes <b>comprar, vender, intercambiar y prestar</b> productos de manera fácil y segura.
        </p>
        <ul class="text-gray-600 text-left mt-3">
          <li>✅ Publica tus productos en minutos.</li>
          <li>✅ Explora categorías y encuentra lo que necesitas.</li>
          <li>✅ Realiza transacciones de manera segura con otros usuarios.</li>
        </ul>
        <p class="text-gray-700 mt-3">
          ¡Únete a nuestra comunidad y aprovecha al máximo nuestra plataforma!
        </p>
      `,
      icon: 'info',
      background: '#f9fafb',
      confirmButtonColor: '#4CAF50',
    });
  }

  mostrarOpcionesRecursos() {
    console.log('Verificando autenticación en FooterComponent...');
    
    if (!this.authService.isLoggedIn()) {
      console.log('FooterComponent: Usuario NO autenticado.');
      Swal.fire({
        title: 'Acceso Denegado',
        text: 'Debes iniciar sesión para acceder a esta sección.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
      return;
    }

    console.log('FooterComponent: Usuario autenticado. Mostrando información.');

    Swal.fire({
      title: 'Importancia de los Recursos',
      html: `
        <p class="text-gray-700 text-lg">
          En nuestra plataforma, puedes administrar dos tipos de recursos fundamentales:
        </p>
        <ul class="text-gray-600 text-left mt-3">
          <li><b>📦 Productos:</b> Son los artículos que puedes vender, intercambiar o prestar.</li>
          <li><b>👤 Usuarios:</b> Gestionar usuarios permite mejorar la seguridad y confianza entre los miembros.</li>
        </ul>
        <p class="text-gray-700 mt-3">
          Si deseas agregar un nuevo recurso, dirígete a la parte superior de la página y selecciona la opción correspondiente.
        </p>
      `,
      icon: 'info',
      background: '#f9fafb',
      confirmButtonColor: '#4CAF50',
      confirmButtonText: 'Entendido',
    });
  }

  mostrarCuentaAdmin() {
    Swal.fire({
      title: 'Tu Cuenta de Administrador',
      html: `
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Administrador" style="width: 100px; margin-bottom: 10px;">
        <p class="text-gray-700 text-lg">
          Como administrador, tienes acceso exclusivo a la gestión de productos y usuarios dentro de la plataforma.
        </p>
        <ul class="text-gray-600 text-left mt-3">
          <li>✅ <b>Gestionar productos:</b> Agregar, editar y eliminar publicaciones.</li>
          <li>✅ <b>Administrar usuarios:</b> Crear, modificar o dar permisos a otros usuarios.</li>
          <li>✅ <b>Seguridad y control:</b> Mantener la plataforma segura y optimizada.</li>
        </ul>
        <p class="text-gray-700 mt-3">
          Usa tus herramientas con responsabilidad para mejorar la comunidad.
        </p>
      `,
      icon: 'info',
      background: '#f9fafb',
      confirmButtonColor: '#4CAF50',
      confirmButtonText: 'Entendido',
    });
  }
}
