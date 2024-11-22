import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, HttpClientModule], // Include HttpClientModule
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
          this.products = data;
        },
        error: (err) => console.error('Error fetching products:', err),
      });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}
