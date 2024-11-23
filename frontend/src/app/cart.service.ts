import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartItems = signal<any[]>([]);

  get cartItems(): any[] {
    return this._cartItems();
  }

  addToCart(product: any, quantity: number): void {
    this._cartItems.update((items) => {
      const existingItem = items.find((item) => item.id === product.id);
      if (existingItem) {
        // Update the quantity
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity } : item
        );
      } else {
        // Add the new product to the cart
        return [...items, { ...product, quantity }];
      }
    });

    console.log('Cart after update:', this._cartItems());
  }

  updateCartItem(productId: number, newQuantity: number): void {
    this._cartItems.update((items) =>
      items.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    console.log(`Updated cart item ${productId} to quantity:`, newQuantity);
  }

  removeFromCart(product: any): void {
    this._cartItems.update((items) =>
      items.filter((item) => item.id !== product.id)
    );
    console.log(`Removed product ID ${product.id} from the cart.`);
  }
}
