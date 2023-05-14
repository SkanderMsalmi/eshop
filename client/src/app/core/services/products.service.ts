import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http :HttpClient) { }

  public getAllProducts() : Observable<Product[]>{
    return this.http.get<Product[]>('/api/product/all');
  }

  public getOneProduct(id : number) : Observable<Product>{
    return this.http.get<Product>(`/api/product/${id}`);
}

public calculScore (product : Product) : string{
  let somme = 0 ;
  let score : any;
  if (product.reviews) {
    product.reviews.forEach(review => {
      somme += review.score;
    });
    score = (somme / product.reviews.length).toFixed(2);
  }
  if (score == "NaN") {
    score = 0;
  }
  return score;
}

public sendFeedback(id : Number, feedback : {score : number , body: string}) : Observable<Product> {
  return this.http.post<Product>(`/api/product/addReview/${id}`,feedback);
}

// Saved Products 
public getSavedProductsForUserId(userId:string){
  return this.http.get<Product[]>(`/api/product/allSavedProductByUserId/${userId}`);
}
// add Product

public addProductToSavedProducts(userId:string,productId:string){
  
  return this.http.post<String>(`/api/product/addProductToSavedList/${userId}/${productId}`,null);
}

public deleteProductFromSavedProducts(userId:string,productId:string){
  
  return this.http.post<String>(`/api/product/deleteProductFromSavedProducts/${userId}/${productId}`,null);
}



}
