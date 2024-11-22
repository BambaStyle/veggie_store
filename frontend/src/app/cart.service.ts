import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems = signal<any[]>([]);

  cartItems = this._cartItems.asReadonly();

  addToCart(product: any) {
    this._cartItems.update(items => [...items, product]);
  }

  removeFromCart(product: any) {
    this._cartItems.update(items => items.filter(item => item !== product));
  }

  getTotalItems() {
    return this._cartItems().length;
  }

  getTotalPrice() {
    return this._cartItems().reduce((total, item) => total + item.price, 0);
  }
}
