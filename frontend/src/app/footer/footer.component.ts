import { Component, computed } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  // Compute the total number of unique products in the cart
  totalUniqueProducts = computed(() => this.cartService.cartItems.length);

  constructor(private cartService: CartService) {}
}
