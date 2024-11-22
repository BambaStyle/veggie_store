import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  constructor(private cartService: CartService) {}

  get cartItems() {
    return this.cartService.cartItems; // Fetch cart items
  }

  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
  }
}
