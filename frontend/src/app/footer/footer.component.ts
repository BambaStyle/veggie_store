import { Component, computed } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  // Computed function to calculate total number of products in the cart
  totalProducts = computed(() =>
    this.cartService.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  );

  constructor(private cartService: CartService) {}
}
