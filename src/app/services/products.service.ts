import { Injectable } from '@angular/core';
import { Products } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'http://localhost:3000/products';
  async getAllProducts(): Promise<Products[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getProductById(id: number): Promise<Products> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json();
  }
}
