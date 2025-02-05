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
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    this.productService.createProduct(this.newProduct).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Producto agregado!',
          text: 'El producto se ha agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // Limpiar el formulario después de cerrar la alerta
          this.newProduct = { name: '', description: '', price: 0 };
        });
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudo agregar el producto', 'error');
        console.error('Error al agregar producto', error);
      }
    });
  }
}
