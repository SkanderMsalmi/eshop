import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product : Product;
  @Output() productEmitter : EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private productService : ProductsService) { }

  ngOnInit(): void {
  }

  removeReview(review : any){
    this.productService.deleteReview(review,this.product._id)
      .subscribe(result => this.product = result);    
  }

  deleteProduct(){
    this.productService.deleteProduct(this.product);
    this.productEmitter.emit(false);
  }
}
