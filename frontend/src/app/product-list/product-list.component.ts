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
  categories: any[] = [];
  selectedCategoryId: number | null = null;

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchCategories(); // Fetch categories on component load
  }

  fetchCategories(): void {
    this.http.get<any[]>('http://127.0.0.1:5000/product-categories').subscribe({
      next: (data) => {
        this.categories = data;
        if (data.length > 0) {
          this.selectedCategoryId = data[0].id; // Default to the first category
          this.fetchProducts(); // Fetch products for the default category
        }
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  fetchProducts(): void {
    if (!this.selectedCategoryId) return;
    this.http
      .get<any[]>(
        `http://127.0.0.1:5000/products-for-category?cat=${this.selectedCategoryId}&pageSize=10&page=1`
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

  // Change category
  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategoryId = Number(target.value);
    this.fetchProducts();
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
