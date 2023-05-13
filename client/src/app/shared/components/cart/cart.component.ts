import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/core/models/product.model';
import { ClearCartAction, DeleteFromCartAction, RemoveFromCartAction } from 'src/app/store/actions/cart.action';
import { Cart } from 'src/app/store/reducers/cart.reducer';
import { StoreInterface } from 'src/app/store/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart : Cart;

  constructor(private store : Store<StoreInterface>) {
    this.store.subscribe(res => {this.cart = res.cart;
    }
    );
  }

  ngOnInit(): void {
  }

  removeProduct (product : Product){
    this.store.dispatch(new RemoveFromCartAction(product));
  }

  removeFromCart(product : Product){
    this.store.dispatch(new DeleteFromCartAction(product));
  }

  clearCart(){
    this.store.dispatch(new ClearCartAction());
  }
}
