import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent {
  newProduct: Product = { name: '', description: '', price: 0 };

  constructor(private productService: ProductService) {}

  addProduct() {
    if (!this.newProduct.name || !this.newProduct.description || this.newProduct.price <= 0) {
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
      title: 'Registrando producto...',
      html: `
        <div class="swal2-loading-animation"></div>
        <p>Espera un momento...</p>
      `,
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
      this.productService.createProduct(this.newProduct).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Producto agregado!',
            html: '<b>El producto ha sido registrado exitosamente.</b>',
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

          this.newProduct = { name: '', description: '', price: 0 }; // Limpiar formulario
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            html: '<b>No se pudo agregar el producto.</b>',
            confirmButtonColor: '#ff4d4d',
            background: '#222',
            color: '#fff',
            showClass: {
              popup: 'animate__animated animate__shakeX' // Efecto de temblor
            }
          });
          console.error('Error al agregar producto', error);
        }
      });
    }, 3000); // Simulación de espera de 3 segundos antes de llamar a la API
  }
}
