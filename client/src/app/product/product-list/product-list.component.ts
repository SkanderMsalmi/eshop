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
  allProducts : Product[];
  isFavourite:boolean =false;
  search : string = '';
  minAmount : string = '0';
  maxAmount : string = '0';
  rating : string = '0';
  stars: number[] = [1, 2, 3, 4, 5];
  public user$:Observable<User | null> = this.authService.user$.asObservable();
  public user:User ;
  public exist:Number;
  public SavedProducts;
  public order : string = "DATE";
  public asec : boolean = true;
  
  constructor(private productService : ProductsService,private authService : AuthService,private router:Router,private activatedRoute: ActivatedRoute) {
    this.user$.subscribe((response)=>this.user = response);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const category = params['category'];
      this.loadProducts(category);
    });
  }

  loadProducts(category: string): void {
    this.isLoaded = false;
    this.productService.getProductsByCategory(category).subscribe(res => {
      this.products = res;
      this.allProducts = res;
      this.isLoaded = true;
    });
  }

  setRating(rating : number){
    if (rating == Number(this.rating)) {
      this.rating = '0'; // Remove the rating if the same star is clicked
    } else {
      this.rating = rating.toString();
    }
    this.filter()
  }

  filter() {
    this.products = this.allProducts.filter( element => {
      const searchTab = element.name.toLowerCase().includes(this.search.toLowerCase()) || this.search == '';
      const minTab = element.price >= Number(this.minAmount) || this.minAmount == '0' || this.minAmount=='';
      const maxTab = element.price <= Number(this.maxAmount) || this.maxAmount == '0' || this.maxAmount=='';
      const ratingTab = element.rating >= Number(this.rating) || this.rating == '0' || this.rating=='';
      return searchTab && minTab && maxTab && ratingTab;
    })
  }

  sort(){
    this.filter();
    if(this.asec){
      switch (this.order) {
        case "DATE":{
          this.products = this.products.sort((a,b) => a.createdAt.getTime() > b.createdAt.getTime() ? 1 : -1);
        }
        case "PRICE": {
          this.products = this.products.sort((a,b) => a.price < b.price ? 1 : -1);
        }
        case "RATING": {
          this.products = this.products.sort((a,b) => Number(a.rating) < Number(b.rating) ? 1 : -1)
        }
      
        default:
          break;
      }
    }else{
      switch (this.order) {
        case "DATE":{
          this.products = this.products.sort((a,b) => a.createdAt.getTime() < b.createdAt.getTime() ? 1 : -1);
        }
        case "PRICE": {
          this.products = this.products.sort((a,b) => a.price > b.price ? 1 : -1);
        }
        case "RATING": {
          this.products = this.products.sort((a,b) => Number(a.rating) > Number(b.rating) ? 1 : -1)
        }
      
        default:
          break;
      }
    }
  }

  toggleOrder(){
    this.asec = !this.asec;
    this.sort();
  }
}
