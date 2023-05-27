import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/core/services/order.service';
@Component({
  selector: 'app-dialog-status',
  templateUrl: './dialog-status.component.html',
  styleUrls: ['./dialog-status.component.scss']
})
export class DialogStatusComponent implements OnInit {
  public status:string;
  constructor(public dialogRef: MatDialogRef<DialogStatusComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private orderService:OrderService) {
    this.status = data.status
   }
   confirmStatus(status: string): void {
    const orderId = this.data.orderId;
    
      this.orderService.changeStatus(orderId,status).subscribe(() => {
        this.dialogRef.close(status);
      });
  
  }
  ngOnInit(): void {
    
    
  }
  onClose(){
    this.dialogRef.close();
  }
}
