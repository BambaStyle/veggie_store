import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, HttpClientModule, FormsModule, TableModule],
})
export class ProductListComponent {
  products: any[] = [];
  categories: any[] = [];
  selectedCategoryId: number = 1; // Default category ID

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchProducts();
  }

  fetchCategories(): void {
    this.http.get<any[]>('http://127.0.0.1:5000/product-categories').subscribe({
      next: (data) => {
        this.categories = data.map((category) => ({
          label: category.name,
          value: category.id,
        })); // Populate the dropdown with categories
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  fetchProducts(): void {
    this.http
      .get<any[]>(
        `http://127.0.0.1:5000/products-for-category?cat=${this.selectedCategoryId}&pageSize=1000&page=1`
      )
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

  onCategoryChange(event: any): void {
    this.selectedCategoryId = Number(event.target.value); // Update selectedCategoryId
    this.fetchProducts(); // Fetch products for the selected category
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
