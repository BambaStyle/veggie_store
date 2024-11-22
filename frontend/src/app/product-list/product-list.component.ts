import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = []; // Holds the list of products fetched from the API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ProductListComponent initialized'); // Debugging log
    this.fetchProducts();
  }

  // Fetches products from the backend
  fetchProducts(): void {
    console.log('Fetching products...');
    this.http
      .get<any[]>('http://127.0.0.1:5000/products-for-category?cat=1&pageSize=10&page=1')
      .subscribe({
        next: (data) => {
          this.products = data; // Populate the products array
          console.log('Fetched products:', this.products); // Log the fetched data
        },
        error: (err) => console.error('Error fetching products:', err), // Log errors
      });
  }

  // Add product to cart (placeholder for now)
  addToCart(product: any): void {
    console.log('Adding to cart:', product); // Log the product being added
  }
}
