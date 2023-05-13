import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/core/models/product.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { AddToCartAction } from 'src/app/store/actions/cart.action';
import { StoreInterface } from 'src/app/store/store';

@Component({
  selector: 'll-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product : Product;
  score : string;
  feedback : {
    score : number,
    body : string,
    userId : string
  }
  public user:User ;


  constructor(private productService : ProductsService, private activatedRoute: ActivatedRoute, private authService : AuthService,
    private cartStore : Store<StoreInterface>) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params["id"];
    this.feedback = {score : 0, body: '', userId : ''};
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    setTimeout(() => {
      this.productService.getOneProduct(id).subscribe(res => {
        this.product = res;
        this.score = this.productService.calculScore(this.product);  
      });
    },500);
  }

  sendFeedback(){    
    this.feedback.userId = this.user._id;
    this.productService.sendFeedback(this.product.productId,this.feedback)
      .subscribe(result => {
        this.product = result;
        this.feedback = {score : 0 , body : "" , userId : this.user._id};
      });
  }

  addToCart(product : Product){
    this.cartStore.dispatch(new AddToCartAction(product));
  }
}
