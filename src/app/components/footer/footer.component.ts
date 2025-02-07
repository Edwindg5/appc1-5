import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  constructor(private router: Router) {}

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
    Swal.fire({
      title: '¿Qué deseas agregar?',
      html: `
        <p class="text-gray-700 text-lg">
          Selecciona una opción para agregar un nuevo recurso.
        </p>
      `,
      icon: 'question',
      background: '#f9fafb',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Agregar Producto',
      denyButtonText: 'Agregar Usuario',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4CAF50',
      denyButtonColor: '#3498db',
      cancelButtonColor: '#e74c3c',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/crear-producto']);
      } else if (result.isDenied) {
        this.router.navigate(['/registrar-usuario']);
      }
    });
  }
}
