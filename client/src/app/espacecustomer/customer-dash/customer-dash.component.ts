import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-customer-dash',
  templateUrl: './customer-dash.component.html',
  styleUrls: ['./customer-dash.component.scss']
})
export class CustomerDashComponent implements OnInit {
  orders = [];
  public user$:Observable<User | null> = this.authService.user$.asObservable();
  public user:User ;
  favouriteProductsNumber;
  ongoingOrders;
  CompletedOrders;
  constructor(private orderService:OrderService,private authService:AuthService,private productService:ProductsService) {
  this.user$.subscribe((response)=>this.user = response);

}
    ngOnInit(): void {
      this.orderService.getOrdersByUser(this.user._id).subscribe((rep)=>{
        this.orders =rep;
      });
      this.orderService.getOrdersCount(this.user._id).subscribe((rep)=>{
        
        this.ongoingOrders = rep.Pending;
        this.CompletedOrders = rep.Delivered;
      });
      this.productService.getSavedProductsForUserId(this.user._id).subscribe((rep)=>{
        this.favouriteProductsNumber=rep.length;
        
      });
      this.orderService.getLatestOrders(this.user._id).subscribe((rep)=>{
        this.orders = rep;
      })
    }
  }
 

