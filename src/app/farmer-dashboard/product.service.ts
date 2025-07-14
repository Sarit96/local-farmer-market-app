import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  getProductsByFarmer(farmerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?farmer=${farmerId}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${productId}`);
  }

  updateProduct(productId: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${productId}`, product);
  }
} 