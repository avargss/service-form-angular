import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../model/products';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  @Input() products!: Products;

}
