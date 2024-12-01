import { Component, computed } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: []
})
export class FooterComponent {
  totalProducts = computed(() => this.cartService.cartItems.length);

  constructor(private cartService: CartService) {}
}
