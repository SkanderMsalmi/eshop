import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/core/services/admin.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders = [];
  view = "list"
  searchQuery: string = '';

  constructor(private adminService:AdminService,private orderService:OrderService,private dialog:MatDialog) {
  
  }
   
  ngOnInit(): void {
    this.adminService.getAllOrders().subscribe((rep)=>{
      this.orders= rep;   
   
      // this.orders=rep;
      
    });
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

}
