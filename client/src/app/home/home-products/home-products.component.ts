import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { productsDB } from '../../shared/data/products'; 
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'll-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  manProducts : Product[];
  womanProducts : Product[];
  isLoggedIn : boolean;
  kidProducts : Product[];
  isLoaded : boolean = false;
  @Output() buttonEmitter : EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private productService:ProductsService, private authService: AuthService, private router:Router) { 
    this.authService.isLoggedin$.subscribe(res => this.isLoggedIn = res);
  }

  ngOnInit(): void { 
    setTimeout(() =>{
      this.productService.getNewestProducts()
      .subscribe(res => {
        this.manProducts = res[0];
        this.womanProducts = res[1];
        this.kidProducts = res[2];
        this.isLoaded = true;
      }
      );
    },2000);
  }

  handleBrowse(){
    if (this.isLoggedIn) {
      this.buttonEmitter.emit(true);
    }else{
      this.router.navigateByUrl('/auth/login');
    }
  }
}
