import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  constructor(private cartService: CartService) {}

  get cartItems() {
    return this.cartService.cartItems;
  }

  removeFromCart(product: any): void {
    this.cartService.removeFromCart(product);
  }
}
