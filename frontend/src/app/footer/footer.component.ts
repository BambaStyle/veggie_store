import { Component, computed } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  // Calculate total number of products in the cart
  totalProducts = computed(() => this.cartService.cartItems.length);

  // Calculate total price of all items in the cart
  totalPrice = computed(() =>
    this.cartService.cartItems.reduce(
      (total: number, item: { price: number; quantity: number }) =>
        total + item.price * item.quantity,
      0
    )
  );

  constructor(private cartService: CartService) {}
}
