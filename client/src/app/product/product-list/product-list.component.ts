import { Component, OnInit } from '@angular/core';
import { productsDB } from '../../shared/data/products';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/core/models/product.model';
import { Store } from '@ngrx/store';
import { StoreInterface } from 'src/app/store/store';
import { AddToCartAction } from 'src/app/store/actions/cart.action';

@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  products : Product[];
  constructor(private productService : ProductsService, private cartStore : Store<StoreInterface>) {}

  ngOnInit(): void {
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
