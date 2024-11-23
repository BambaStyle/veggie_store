import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, HttpClientModule],
})
export class ProductListComponent {
  products: any[] = [];

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http
      .get<any[]>('http://127.0.0.1:5000/products-for-category?cat=1&pageSize=10&page=1')
      .subscribe({
        next: (data) => {
          this.products = data.map((product) => ({
            ...product,
            quantity: 1, // Default quantity
          }));
        },
        error: (err) => console.error('Error fetching products:', err),
      });
  }

  incrementQuantity(product: any): void {
    product.quantity += 1;
  }

  decrementQuantity(product: any): void {
    if (product.quantity > 1) {
      product.quantity -= 1;
    }
  }

  addToCart(product: any): void {
    if (product.quantity > 0) {
      this.cartService.addToCart(product, product.quantity);
      console.log(`Added/Updated product in cart:`, product);
    }
  }
}
