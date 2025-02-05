import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
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

  showProductOptions(product: Product) {
    Swal.fire({
      title: `Acciones para ${product.name}`,
      text: '¿Qué deseas hacer con este producto?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para editar
        console.log('Editar producto', product);
      }
    });
  }


  mostrarOpciones(product: Product) {
    Swal.fire({
      title: `Acciones para ${product.name}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Editar',
      denyButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
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
      html:
        `<input id="name" class="swal2-input" placeholder="Nombre" value="${product.name}">` +
        `<input id="description" class="swal2-input" placeholder="Descripción" value="${product.description}">` +
        `<input id="price" type="number" class="swal2-input" placeholder="Precio" value="${product.price}">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLInputElement).value;
        const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
        
        return { ...product, name, description, price };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarProducto(result.value);
      }
    });
  }
  
  actualizarProducto(product: Product) {
    this.productService.updateProduct(product).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Producto actualizado correctamente', 'success');
        this.loadProducts(); // Recargar la lista
      },
      error: (error) => Swal.fire('Error', 'No se pudo actualizar el producto', 'error'),
    });
  }
  confirmarEliminacion(product: Product) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminarás el producto: ${product.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarProducto(product.id);
      }
    });
  }
  eliminarProducto(productId?: number) {
    if (productId === undefined) {
      Swal.fire('Error', 'ID de producto no válido', 'error');
      return;
    }
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        Swal.fire('Eliminado', 'El producto ha sido eliminado correctamente', 'success');
        this.loadProducts(); // Recargar la lista después de eliminar
      },
      error: () => {
        Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
      }
    });
  }
  
  
  
}
