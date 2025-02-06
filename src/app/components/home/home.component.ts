import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (error) => console.error('Error al cargar productos', error),
    });
  }

  mostrarOpciones(product: Product) {
    Swal.fire({
      title: `Acciones para <span class="text-blue-500">${product.name}</span>`,
      html: '<p class="text-gray-600">Selecciona una opción:</p>',
      icon: 'info',
      background: '#1e293b',
      color: '#fff',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: '<i class="fas fa-edit"></i> Editar',
      denyButtonText: '<i class="fas fa-trash-alt"></i> Eliminar',
      cancelButtonText: '<i class="fas fa-times"></i> Cancelar',
      confirmButtonColor: '#4CAF50',
      denyButtonColor: '#E53935',
      cancelButtonColor: '#FBC02D',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.editarProducto(product);
      } else if (result.isDenied) {
        this.confirmarEliminacion(product);
      }
    });
  }

  editarProducto(product: Product) {
    Swal.fire({
      title: 'Editar Producto',
      html: `
        <input id="name" class="swal2-input" placeholder="Nombre" value="${product.name}">
        <input id="description" class="swal2-input" placeholder="Descripción" value="${product.description}">
        <input id="price" type="number" class="swal2-input" placeholder="Precio" value="${product.price}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      background: '#1e293b',
      color: '#fff',
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#FBC02D',
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLInputElement).value;
        const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
        return { ...product, name, description, price };
      },
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarProducto(result.value);
      }
    });
  }

  actualizarProducto(product: Product) {
    this.productService.updateProduct(product).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Producto actualizado correctamente',
          icon: 'success',
          background: '#1e293b',
          color: '#fff',
          confirmButtonColor: '#4CAF50',
          timer: 2000,
          showClass: {
            popup: 'animate__animated animate__bounceIn'
          },
          hideClass: {
            popup: 'animate__animated animate__bounceOut'
          }
        });
        this.loadProducts();
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el producto',
          icon: 'error',
          background: '#1e293b',
          color: '#fff',
          confirmButtonColor: '#E53935'
        });
      }
    });
  }

  confirmarEliminacion(product: Product) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminarás el producto: ${product.name}`,
      icon: 'warning',
      background: '#1e293b',
      color: '#fff',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#E53935',
      cancelButtonColor: '#FBC02D',
      showClass: {
        popup: 'animate__animated animate__shakeX'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarProducto(product.id);
      }
    });
  }

  eliminarProducto(productId?: number) {
    if (productId === undefined) {
      Swal.fire({
        title: 'Error',
        text: 'ID de producto no válido',
        icon: 'error',
        background: '#1e293b',
        color: '#fff',
        confirmButtonColor: '#E53935'
      });
      return;
    }
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El producto ha sido eliminado correctamente',
          icon: 'success',
          background: '#1e293b',
          color: '#fff',
          confirmButtonColor: '#4CAF50',
          timer: 2000,
          showClass: {
            popup: 'animate__animated animate__fadeIn'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOut'
          }
        });
        this.loadProducts();
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el producto',
          icon: 'error',
          background: '#1e293b',
          color: '#fff',
          confirmButtonColor: '#E53935'
        });
      }
    });
  }
}
