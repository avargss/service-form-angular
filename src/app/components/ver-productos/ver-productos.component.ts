import { Component, inject } from '@angular/core';
import { Products } from '../../model/products';
import { ProductsService } from '../../services/products.service';
import { ProductsComponent } from "../products/products.component";
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-ver-productos',
  imports: [ProductsComponent, NgForOf],
  templateUrl: './ver-productos.component.html',
  styleUrl: './ver-productos.component.css'
})
export class VerProductosComponent {

  productsList: Products[] = [];
  productsService: ProductsService = inject(ProductsService);
  filteredProductsList: Products[] = [];

  constructor() {
    this.productsService.getAllProducts().then((productsList: Products[]) => {
      this.productsList = productsList;
      this.filteredProductsList = productsList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredProductsList = this.productsList.filter((products) => products?.categoria.toLowerCase().includes(text.toLowerCase()));
      return;
    }

    this.filteredProductsList = this.productsList.filter((product) =>
      product?.categoria.toLowerCase().includes(text.toLowerCase()),
    );


    /* this.productsService.getAllProducts().then((productsList: Products[]) => {
      this.productsList = productsList;
      this.filteredProductsList = productsList;
    }); */

  }
}
