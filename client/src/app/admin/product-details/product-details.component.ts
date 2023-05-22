import { Component, EventEmitter, Input, OnInit, Output, ElementRef, OnDestroy } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from '../services/products.service';
import { AnimationBuilder, animate, style } from '@angular/animations';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  @Input() product : Product;
  @Output() productEmitter : EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private productService : ProductsService, private animationBuilder : AnimationBuilder, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.fadeInAnimation();
  }

  ngOnDestroy(): void {
  }

  removeReview(review : any){
    this.productService.deleteReview(review,this.product._id)
      .subscribe(result => this.product = result);    
  }

  deleteProduct(){
    this.productService.deleteProduct(this.product);
    this.productEmitter.emit(false);
  }

  close(){
    this.fadeOutAnimation();
    setTimeout(() => {
      this.productEmitter.emit(false);
    },500);
  }

  private fadeInAnimation() {
    const animationFactory = this.animationBuilder.build([
      style({ opacity: 0 }),
      animate('500ms ease-in', style({ opacity: 1 }))
    ]);

    const player = animationFactory.create(this.elementRef.nativeElement);
    player.play();
  }

  private fadeOutAnimation() {
    const animationFactory = this.animationBuilder.build([
      style({ opacity: 1 }),
      animate('500ms ease-out', style({ opacity: 0 }))
    ]);

    const player = animationFactory.create(this.elementRef.nativeElement);
    player.play();
  }
}
