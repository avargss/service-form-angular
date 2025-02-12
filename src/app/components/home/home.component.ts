import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from "../products/products.component";
import { Products } from '../../model/products';
import { ProductsService } from '../../services/products.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  /* productsList: Products[] = [];
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
    ); */


  /* this.productsService.getAllProducts().then((productsList: Products[]) => {
    this.productsList = productsList;
    this.filteredProductsList = productsList;
  }); */

}