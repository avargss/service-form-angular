import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LoggerService } from '../../services/logger.service';
import { Products } from '../../model/products';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(private logger: LoggerService) { }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      // Se crea un nuevo producto a partir de los valores del formulario.
      // Para el campo 'marca' se asigna un objeto simple; en un caso real, se podría
      // obtener de un listado de marcas o un servicio.
      const newProduct: Products = {
        id: new Date().getTime(), // Generación simple de ID
        imagen: form.value.imagen,
        nombre: form.value.nombre,
        talla: form.value.talla,  // Asegúrate de que el valor coincide con tu enum o definición
        precio: form.value.precio,
        marca: {
          id: 1,                     // Valor por defecto o se puede adaptar según la lógica
          nombre: form.value.marca,  // Se recibe como texto, se puede convertir a objeto Marca
          paisOrigen: '',            // Se puede completar si se requiere
          anioFundacion: 0           // Valor por defecto
        },
        categoria: form.value.categoria, // "log" | "warn" | "error"
        tipo: form.value.tipo
      };

      // Uso del LoggerService según la categoría del producto
      if (newProduct.categoria === 'log') {
        this.logger.log(`Producto registrado: ${newProduct.nombre}`);
      } else if (newProduct.categoria === 'warn') {
        this.logger.warn(`Producto registrado: ${newProduct.nombre}`);
      } else if (newProduct.categoria === 'error') {
        this.logger.error(`Producto registrado: ${newProduct.nombre}`);
      }

      console.log('Producto registrado:', newProduct);
      // Aquí podrías, además, enviar el objeto newProduct a un servicio para persistirlo
      form.reset();
    }
  }
}
