import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { ProductService } from './product.service';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  template: `
    <div class="dashboard-container">
      <h2>My Products</h2>
      <button mat-raised-button color="primary" (click)="openAddProduct()">Add Product</button>
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
  `],
  imports: [CommonModule, MaterialModule]
})
export class FarmerDashboardComponent implements OnInit {
  products: any[] = [];
  displayedColumns = ['name', 'category', 'price', 'quantity', 'actions'];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Replace with actual farmerId from auth/user context
    const farmerId = localStorage.getItem('farmerId') || '';
    if (farmerId) {
      this.productService.getProductsByFarmer(farmerId).subscribe(
        (products) => this.products = products,
        (error) => console.error('Failed to fetch products:', error)
      );
    }
  }

  openAddProduct() {
    // TODO: Open add product modal
    alert('Add Product modal would open');
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