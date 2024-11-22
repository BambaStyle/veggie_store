import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  cartService = inject(CartService);

  totalProducts = computed(() => this.cartService.cartItems().length);
  totalPrice = computed(() =>
    this.cartService.cartItems().reduce((total, item) => total + item.price * item.quantity, 0)
  );
}
