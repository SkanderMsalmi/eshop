import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/core/models/order.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ClearCartAction } from 'src/app/store/actions/cart.action';
import { Cart } from 'src/app/store/reducers/cart.reducer';
import { StoreInterface } from 'src/app/store/store';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  cart : Cart;
  user : User;

  constructor(  public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, cart: Cart },
    private store: Store<StoreInterface>,
    private orderService : OrderService,
    private authservice : AuthService
  ) { }

  ngOnInit(): void {
    this.cart = this.data.cart;
    this.authservice.user$.subscribe(res => this.user = res);
  }

  passerCommande(){
    let order = new Order;
    order.status = "PENDING";
    order.totalAmount = this.cart.total;
    order.products = this.cart.products;
    order.userId = this.user;
    order.shippingInfo = "test post order";
    this.orderService.postNewOrder(order).subscribe(result =>{
      this.store.dispatch(new ClearCartAction());
      this.dialogRef.close();
    });
  }

  clearCart(){
    this.store.dispatch(new ClearCartAction());
    this.dialogRef.close();
  }

  onClose(){
    this.dialogRef.close();
  }
}
