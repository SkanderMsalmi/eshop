import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {
  product : Product;
  @Output() dialogEmitter : EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, payload: Product },
    private productService : ProductsService
  ) { }

  ngOnInit(): void {
    this.product = this.data.payload;
  }

  deleteProduct(){
    this.productService.deleteProduct(this.product);
    this.dialogRef.close();
  }

  closeDiag(){
    this.dialogEmitter.emit(true);
    this.dialogRef.close();
  }
}
