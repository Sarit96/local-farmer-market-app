import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { ProductService } from './product.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  template: `
    <div class="dashboard-hero">
      <h1>🌾 Farmer Dashboard</h1>
      <p>Welcome! Manage your products and grow your business with ease.</p>
    </div>
    <div class="dashboard-container">
      <h2>My Products</h2>
      <div *ngIf="successMessage" class="success-message">{{ successMessage }}</div>
      <button mat-raised-button color="primary" (click)="openAddProduct()">Add Product</button>
      <form *ngIf="showAddForm" (ngSubmit)="submitAddProduct()" #addProductForm="ngForm" class="add-product-form">
        <mat-form-field appearance="fill">
          <mat-label>Name</mat-label>
          <input matInput name="name" [(ngModel)]="newProduct.name" required />
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Category</mat-label>
          <input matInput name="category" [(ngModel)]="newProduct.category" required />
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Price</mat-label>
          <input matInput type="number" name="price" [(ngModel)]="newProduct.price" required min="0" />
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Quantity</mat-label>
          <input matInput type="number" name="quantity" [(ngModel)]="newProduct.quantity" required min="0" />
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="addProductForm.invalid">Save</button>
        <button mat-button type="button" (click)="cancelAddProduct()">Cancel</button>
      </form>
      <table mat-table [dataSource]="products" class="mat-elevation-z8 product-table">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let product">{{ product.name }}</td>
        </ng-container>
        <ng-container matColumnDef="category">
          <th mat-header-cell *matHeaderCellDef>Category</th>
          <td mat-cell *matCellDef="let product">{{ product.category }}</td>
        </ng-container>
        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef>Price</th>
          <td mat-cell *matCellDef="let product">{{ product.price | currency }}</td>
        </ng-container>
        <ng-container matColumnDef="quantity">
          <th mat-header-cell *matHeaderCellDef>Quantity</th>
          <td mat-cell *matCellDef="let product">{{ product.quantity }}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let product">
            <button mat-icon-button color="accent" (click)="editProduct(product)"><mat-icon>edit</mat-icon></button>
            <button mat-icon-button color="warn" (click)="deleteProduct(product)"><mat-icon>delete</mat-icon></button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
      <!-- Add/Edit Product Modal would go here -->
    </div>
  `,
  styles: [`
    .dashboard-hero {
      background: linear-gradient(120deg, #43cea2 0%, #185a9d 100%);
      color: #fff;
      padding: 40px 0 24px 0;
      text-align: center;
      border-radius: 0 0 24px 24px;
      margin-bottom: 32px;
      box-shadow: 0 4px 24px rgba(24,90,157,0.12);
    }
    .dashboard-container {
      max-width: 950px;
      margin: 0 auto;
      padding: 32px 32px 24px 32px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.10);
      position: relative;
      top: -40px;
    }
    h2 {
      margin-bottom: 24px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #185a9d;
    }
    .product-table {
      width: 100%;
      margin-top: 24px;
      border-radius: 8px;
      overflow: hidden;
      background: #f8fafc;
    }
    .mat-header-row, .mat-row {
      transition: background 0.2s;
    }
    .mat-row:hover {
      background: #e3f2fd;
    }
    button[mat-raised-button] {
      margin-bottom: 16px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .add-product-form {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
      align-items: center;
      background: #f1f8e9;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(67,206,162,0.08);
    }
    .add-product-form mat-form-field {
      flex: 1 1 180px;
      min-width: 120px;
    }
    .success-message {
      color: #388e3c;
      margin-bottom: 16px;
      font-weight: bold;
      background: #e8f5e9;
      padding: 8px 16px;
      border-radius: 6px;
      box-shadow: 0 1px 4px rgba(56,142,60,0.08);
      display: inline-block;
    }
    .mat-icon-button {
      transition: background 0.2s;
      border-radius: 50%;
    }
    .mat-icon-button:hover {
      background: #e3f2fd;
    }
  `],
  imports: [CommonModule, MaterialModule, FormsModule]
})
export class FarmerDashboardComponent implements OnInit {
  products: any[] = [];
  displayedColumns = ['name', 'category', 'price', 'quantity', 'actions'];

  showAddForm = false;
  newProduct: any = { name: '', category: '', price: null, quantity: null };
  successMessage: string = '';

  constructor(private productService: ProductService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    let farmerId = localStorage.getItem('farmerId');
    if (!farmerId) {
      // Prompt user to log in if farmerId is missing
      alert('Please log in as a farmer to view your dashboard.');
      this.router.navigate(['/login']);
      return;
    }
    this.loadProducts();
  }

  loadProducts() {
    const farmerId = localStorage.getItem('farmerId') || '';
    if (farmerId) {
      this.productService.getProductsByFarmer(farmerId).subscribe(
        (products) => {
          console.log('Fetched products for farmer', farmerId, products);
          this.products = products;
          this.cdr.detectChanges();
        },
        (error) => console.error('Failed to fetch products:', error)
      );
    }
  }

  openAddProduct() {
    this.showAddForm = true;
    this.newProduct = { name: '', category: '', price: null, quantity: null };
  }

  cancelAddProduct() {
    this.showAddForm = false;
    this.newProduct = { name: '', category: '', price: null, quantity: null };
  }

  submitAddProduct() {
    let farmerId = localStorage.getItem('farmerId');
    if (!farmerId) {
      alert('Farmer ID not found. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }
    const productToAdd = { ...this.newProduct, farmer: farmerId };
    console.log('Adding product:', productToAdd);
    this.productService.addProduct(productToAdd).subscribe(
      (savedProduct) => {
        this.showAddForm = false;
        this.loadProducts();
        this.successMessage = 'Product added successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      (error) => {
        alert('Failed to add product: ' + (error.error?.error || error.message));
      }
    );
  }

  editProduct(product: any) {
    // TODO: Open edit product modal
    alert('Edit Product modal would open for ' + product.name);
  }

  deleteProduct(product: any) {
    if (confirm(`Are you sure you want to delete the product: ${product.name}?`)) {
      this.productService.deleteProduct(product._id).subscribe(
        () => this.loadProducts(),
        (error) => alert('Failed to delete product: ' + (error.error?.error || error.message))
      );
    }
  }
} 