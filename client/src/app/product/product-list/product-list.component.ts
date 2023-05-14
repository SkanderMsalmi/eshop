import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/core/models/product.model';
import { Store } from '@ngrx/store';
import { StoreInterface } from 'src/app/store/store';
import { AddToCartAction } from 'src/app/store/actions/cart.action';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  products : Product[];
  isFavourite:boolean =false;
  public user$:Observable<User | null> = this.authService.user$.asObservable();
  public user:User ;
  public exist:Number;
  public SavedProducts;
  
  constructor(private productService : ProductsService,private authService : AuthService,private router:Router, private cartStore : Store<StoreInterface>) {
    this.user$.subscribe((response)=>this.user = response);
  
    
 
  }
  toggleList(productId: string) {
    const isProductSaved = this.SavedProducts.some(savedProduct => savedProduct._id === productId);
    if (isProductSaved) {
      this.productService.deleteProductFromSavedProducts(this.user._id, productId).subscribe(() => {
        // Do something after successfully deleting the product
        this.productService.getSavedProductsForUserId(this.user._id).subscribe((savedProducts) => {
          this.SavedProducts = savedProducts;
        });
      });
    } else {
      this.productService.addProductToSavedProducts(this.user._id, productId).subscribe(() => {
        // Do something after successfully adding the product
         this.productService.getSavedProductsForUserId(this.user._id).subscribe((savedProducts) => {
      this.SavedProducts = savedProducts;
    });
      });
    }
  }
  ngOnInit(): void {
    this.productService.getSavedProductsForUserId(this.user._id).subscribe((savedProducts) => {
      this.SavedProducts = savedProducts;
    });
    setTimeout(() => {
      this.productService.getAllProducts().subscribe(res => {
        this.products = res;
        this.isLoaded = true
        this.products.forEach(product => product.rating = this.productService.calculScore(product))
        
      })
    },50)
  }

  addToCart(product : Product){
    this.cartStore.dispatch(new AddToCartAction(product));
  }
}
