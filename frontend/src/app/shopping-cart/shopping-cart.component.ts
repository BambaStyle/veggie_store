import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  template: `
    <h2>Shopping Cart</h2>
    <div class="shopping-cart">
      <p>Shopping cart details will appear here.</p>
    </div>
  `,
  styles: [`
    .shopping-cart {
      padding: 1rem;
    }
  `],
  standalone: true
})
export class ShoppingCartComponent {}
