import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { ProductService } from './product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  template: `
    <div class="dashboard-container">
      <h2>My Products</h2>
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
    .dashboard-container {
      max-width: 900px;
      margin: 40px auto;
      padding: 24px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    h2 {
      margin-bottom: 24px;
    }
    .product-table {
      width: 100%;
      margin-top: 24px;
    }
    button[mat-raised-button] {
      margin-bottom: 16px;
    }
    .add-product-form {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
      align-items: center;
    }
    .add-product-form mat-form-field {
      flex: 1 1 180px;
      min-width: 120px;
    }
  `],
  imports: [CommonModule, MaterialModule, FormsModule]
})
export class FarmerDashboardComponent implements OnInit {
  products: any[] = [];
  displayedColumns = ['name', 'category', 'price', 'quantity', 'actions'];

  showAddForm = false;
  newProduct: any = { name: '', category: '', price: null, quantity: null };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const farmerId = localStorage.getItem('farmerId') || '';
    if (farmerId) {
      this.productService.getProductsByFarmer(farmerId).subscribe(
        (products) => this.products = products,
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
    const farmerId = localStorage.getItem('farmerId') || '';
    if (!farmerId) {
      alert('Farmer ID not found. Please log in again.');
      return;
    }
    const productToAdd = { ...this.newProduct, farmer: farmerId };
    this.productService.addProduct(productToAdd).subscribe(
      (savedProduct) => {
        this.showAddForm = false;
        this.loadProducts();
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
    // TODO: Delete product logic
    alert('Delete Product: ' + product.name);
  }
} 