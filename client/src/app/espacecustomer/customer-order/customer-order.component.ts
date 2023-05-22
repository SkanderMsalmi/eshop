import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, fromEvent } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.scss']
})
export class CustomerOrderComponent implements OnInit {
  public order;
  orders = [];
  public user$:Observable<User | null> = this.authService.user$.asObservable();
  public user:User ;
  constructor(private orderService:OrderService,private authService:AuthService,private dialog:MatDialog,private renderer: Renderer2, private elementRef: ElementRef) {
this.user$.subscribe((response)=>this.user = response);

  }

  ngOnInit(): void {
    this.orderService.getOrdersByUser(this.user._id).subscribe((rep)=>{
      this.orders =rep;
    })
  }
  deleteOrder(s){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this order?' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.orderService.deleteOrderById(s).subscribe(() => {
          // Refresh the orders list after successful block
          this.orders = this.orders.filter(order =>order._id !== s);
        });
      }
    });
  }
  getDetailOrder(o,i){
    this.order = o;
    const detailSection = this.elementRef.nativeElement.querySelector('#detail-section');

    
    setTimeout(() => {
      detailSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }
  closeDetail(){
    this.order=null;
    
    const detailSection = this.elementRef.nativeElement.querySelector('#orders');
    detailSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
