import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }

  getAllProducts() : Observable<Product[]>{
    return this.http.get<Product[]>('/api/product/all');
  }

  getOneProduct(id : string) : Observable<Product>{
    return this.http.get<Product>(`/api/product/${id}`);
  }

  postNewProduct(product :FormData) : Observable<Product>{
    return this.http.post<Product>(`/api/product/new`, product);
  }

  deleteProduct(product : Product) : void{
    this.http.delete(`/api/product/delete/${product._id}`).subscribe();
  }

  updateProduct(product : FormData, id : string) : Observable<Product>{
    return this.http.put<Product>(`/api/product/edit/${id}`, product);
  }

  deleteReview(review : any, id :string) : Observable<Product>{
    return this.http.put<Product>(`/api/product/delete-review/${id}`,review);
  }
}
