import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngIf and *ngFor
import { HttpClientModule } from '@angular/common/http'; // For HTTP requests
import { CurrencyPipe } from '@angular/common'; // For currency pipe
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, HttpClientModule], // Import CommonModule and HttpClientModule
})
export class ProductListComponent {
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('Fetching products...');
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http
      .get<any[]>('http://127.0.0.1:5000/products-for-category?cat=1&pageSize=10&page=1')
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log('Fetched products:', this.products);
        },
        error: (err) => console.error('Error fetching products:', err),
      });
  }

  addToCart(product: any): void {
    console.log('Adding product to cart:', product);
  }
}
