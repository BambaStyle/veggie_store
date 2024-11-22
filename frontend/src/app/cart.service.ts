import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartItems = signal<any[]>([]);

  get cartItems(): any[] {
    return this._cartItems(); // Return the signal value
  }

  addToCart(product: any): void {
    const existing = this._cartItems().find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this._cartItems.update((items) => [...items, { ...product, quantity: 1 }]);
    }
  }

  removeFromCart(product: any): void {
    this._cartItems.update((items) => items.filter((item) => item.id !== product.id));
  }
}
