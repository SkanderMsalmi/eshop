import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/core/models/order.model';
import { AdminService } from 'src/app/core/services/admin.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator : MatPaginator;
  orders = [];
  listOrders : MatTableDataSource<Order>;
  itemsPerPage = 10;
  currentPage = 0;

  view = "list"
  searchQuery: string = '';

  constructor(private adminService:AdminService,private orderService:OrderService,private dialog:MatDialog) {
  
  }
   
  ngOnInit(): void {
    this.adminService.getAllOrders().subscribe((rep)=>{
      this.orders= rep;   
      this.listOrders = new MatTableDataSource(this.orders);
      this.listOrders.paginator = this.paginator;
      
      // this.orders=rep;
      
    });
  }

  onPageChange(event : PageEvent){
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
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
