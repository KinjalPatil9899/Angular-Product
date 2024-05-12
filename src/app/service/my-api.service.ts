import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyApiService {

  constructor(private http: HttpClient) { }

  getAllProduct(page: number, pageSize: number, sortBy: string, sortOrder: string): Observable<any> {
    const url = `/api/get-all-product-api?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    return this.http.get<any>(url);
  }

  getProduct(id: any): Observable<any> {
    const url = `/api/get-product-api/${id}`;
    return this.http.get<any>(url);
  }

  addProduct(productData: FormData): Observable<any> {

    // Set headers for multipart form data
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const url = `/api/add-product-api`;
    return this.http.post<any>(url, productData, { headers: headers });
  }

  updateProduct(id: any,productData: any): Observable<any> {
    const url = `/api/update-product-api/${id}`;
    return this.http.put<any>(url, productData);
  }

  deleteProduct(id: any): Observable<any> {
    const url = `/api/delete-product-api/${id}`;
    return this.http.delete<any>(url);
  }

  uploadProductImage(formData: any): Observable<any> {
    const url = `/api/upload-product-image-api`;
    return this.http.post<any>(url, formData);
  }
}
