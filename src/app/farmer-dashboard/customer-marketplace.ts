import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { MaterialModule } from '../material-module';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer-marketplace',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <div class="marketplace-container">
      <h2>Marketplace</h2>
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
          <th mat-header-cell *matHeaderCellDef>Available</th>
          <td mat-cell *matCellDef="let product">{{ product.quantity }}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let product">
            <button mat-raised-button color="primary" (click)="buyProduct(product)" [disabled]="product.quantity <= 0">Buy</button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .marketplace-container {
      max-width: 950px;
      margin: 40px auto;
      padding: 32px 32px 24px 32px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.10);
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
      font-weight: 600;
      letter-spacing: 0.5px;
    }
  `]
})
export class CustomerMarketplaceComponent implements OnInit {
  products = new MatTableDataSource<any>();
  displayedColumns = ['name', 'category', 'price', 'quantity', 'actions'];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      this.products.data = products;
    });
  }

  buyProduct(product: any) {
    alert('Purchased: ' + product.name + ' (Demo only)');
    // Here you can implement order logic in the future
  }
} 