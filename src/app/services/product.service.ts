import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../types';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class ProductService {
  protected API = environment.apiUrl;
  constructor(protected http: HttpClient) {}
  public findById(id: any): Observable<Product> {
    return this.http.get<Product>(`${this.API}/products/${id}`);
  }

  public findAll(params?): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API}/products`, { params });
  }

  public delete(id): Observable<Product> {
    return this.http.delete<Product>(`${this.API}/products/${id}`).pipe(tap(console.log));
  }

  public insert(data: Product): Observable<Product> {
    return this.http.post<Product>(`${this.API}/products`, data);
  }

  public update(data: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API}/products/${data.id}`, data);
  }

  form(data?: Product): FormGroup {
    return new FormGroup({
      id: new FormControl(data?.id || null),
      title: new FormControl(data?.title || null, [Validators.required]),
      price: new FormControl(data?.price || 0, [Validators.required]),
    });
  }
}
