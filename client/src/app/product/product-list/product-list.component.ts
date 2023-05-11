import { Component, OnInit } from '@angular/core';
import { productsDB } from '../../shared/data/products';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  products : Product[];
  constructor(private productService : ProductsService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.productService.getAllProducts().subscribe(res => {
        this.products = res;
        this.isLoaded = true
        console.log(this.products);
        
      })
    },10)
  }
}
