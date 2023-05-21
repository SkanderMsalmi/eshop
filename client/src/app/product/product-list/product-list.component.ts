import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/core/models/product.model';
import { ActivatedRoute } from "@angular/router";
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
  
  constructor(private productService : ProductsService,private authService : AuthService,private router:Router,private activatedRoute: ActivatedRoute) {
    this.user$.subscribe((response)=>this.user = response);
  }

  ngOnInit(): void {
    let category = this.activatedRoute.snapshot.params["category"];
    setTimeout(() => {
      this.productService.getProductsByCategory(category).subscribe(res => {
        this.products = res;
        this.isLoaded = true
        this.products.forEach(product => product.rating = this.productService.calculScore(product))
      })
    },50)
  }
}
