import { Component, signal, inject } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  cartService = inject(CartService);

  products = [
    { id: 1, name: 'Tomato', price: 1.0, quantity: 1 },
    { id: 2, name: 'Cucumber', price: 2.0, quantity: 1 },
    { id: 3, name: 'Carrot', price: 1.5, quantity: 1 }
  ];

  addToCart(product: any) {
    this.cartService.addToCart({ ...product });
  }
}
