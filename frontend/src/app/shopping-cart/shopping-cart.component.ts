import { Component, inject, signal } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }
}
