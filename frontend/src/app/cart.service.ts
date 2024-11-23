import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartItems = signal<any[]>([]);

  get cartItems() {
    return this._cartItems();
  }

  addToCart(product: any, quantity: number = 1) {
    const existing = this._cartItems().find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity; // Update quantity
    } else {
      this._cartItems.update((items) => [...items, { ...product, quantity }]); // Add new product with quantity
    }
  }


  removeFromCart(product: any) {
    this._cartItems.update((items) =>
      items.filter((item) => item.id !== product.id)
    );
  }
}
