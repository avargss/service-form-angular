import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../model/products';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  @Input() products!: Products;

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
