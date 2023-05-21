import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order.service';
import { DialogStatusComponent } from 'src/app/shared/components/dialog-status/dialog-status.component';
import { productsDB } from 'src/app/shared/data/products';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit {
  view = 'list';
   order:Order;
  products;
  id;
  constructor(private route: ActivatedRoute,private orderService:OrderService,public dialog: MatDialog) {
    
  
    
  }
  openDialog(s:string): void {
    const dialogRef = this.dialog.open(DialogStatusComponent, {
      width: '350px',
      data:{orderId:this.id,status:this.order.status}
    });

    dialogRef.afterClosed().subscribe(result => {
    
      this.order.status = result;
    });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.orderService.getOrderById(this.id).subscribe((rep)=>{
      
      this.order=rep;
      console.log(this.order);
      
    });
  }
}
