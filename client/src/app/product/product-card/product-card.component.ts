import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { AddToCartAction } from 'src/app/store/actions/cart.action';
import { StoreInterface } from 'src/app/store/store';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  isFavourite:boolean =false;
  public user$:Observable<User | null> = this.authService.user$.asObservable();
  public isLoggedIn : boolean;
  public user:User ;
  public exist:Number;
  public SavedProducts;
  constructor(private cartStore : Store<StoreInterface>, private productService : ProductsService,private authService : AuthService,private router:Router) 
  {
    this.user$.subscribe((response)=>{
      this.user = response
      this.authService.isLoggedin$.subscribe(res => this.isLoggedIn = res
      )
      
    });
  }

  ngOnInit(): void {
    this.product.rating = this.productService.calculScore(this.product);
    if (this.isLoggedIn) {
      this.productService.getSavedProductsForUserId(this.user._id).subscribe((savedProducts) => {
        if (savedProducts) {
          savedProducts.forEach(savedProduct => {
            if(savedProduct._id == this.product._id){
              this.isFavourite = true;
            }
          })
        }
      });
    }
  }

  addToCart(product : Product){
    event.stopPropagation();
    if (this.isLoggedIn) {
      this.cartStore.dispatch(new AddToCartAction(product));
    }else{
      this.router.navigateByUrl("/auth/login");
    }
  }

  toggleList(productId: string) {
    event.stopPropagation();
    if (this.isFavourite) {
      this.productService.deleteProductFromSavedProducts(this.user._id, productId).subscribe(() => {
        // Do something after successfully deleting the product
        this.productService.getSavedProductsForUserId(this.user._id).subscribe((savedProducts) => {
          this.isFavourite = !this.isFavourite;
        });
      });
    } else {
      this.productService.addProductToSavedProducts(this.user._id, productId).subscribe(() => {
        // Do something after successfully adding the product
        this.productService.getSavedProductsForUserId(this.user._id).subscribe((savedProducts) => {
          this.isFavourite = !this.isFavourite;
    });
      });
    }
  }

}
