import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/core/models/order.model';
import { Product } from 'src/app/core/models/product.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
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
  user : User;

  constructor(private store : Store<StoreInterface> ,private orderService : OrderService, private authService : AuthService) {
    this.store.subscribe(res => {
      this.cart = res.cart;
      this.authService.user$.subscribe(result => this.user = result
      )
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

  passerCommande(){
    let order = new Order;
    order.Status = "PENDING";
    order.totalAmount = this.cart.total;
    order.products = this.cart.products;
    order.userId = this.user;
    order.shippingInfo = "test post order";
    this.orderService.postNewOrder(order).subscribe(result => this.store.dispatch(new ClearCartAction()));
  }
}
