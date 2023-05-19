import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from 'src/app/core/models/product.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from "../components/dialog-delete/dialog-delete.component";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {

  @ViewChild(MatPaginator) paginator : MatPaginator;
  listProducts : MatTableDataSource<Product>
  selectedProduct : Product;
  itemsPerPage = 10;
  currentPage = 0;
  constructor(private productsService : ProductsService, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((result : Product[]) => {
      this.listProducts = new MatTableDataSource(result);
      this.listProducts.paginator = this.paginator;
    });
  }

  onPageChange(event : PageEvent){
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }

  select(product : Product){
    this.selectedProduct = product;
  }

  handleProduct(){
    this.listProducts = new MatTableDataSource(this.listProducts.data.filter(p => p._id != this.selectedProduct._id));
    this.selectedProduct = null;
  }

  closeDetails(){
    this.selectedProduct = null;
  }

  openDialog(product : Product){
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '70rem',
      autoFocus : true,
      data: { title: 'Are you sure ?? ', 'payload' : product }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.productsService.getAllProducts().subscribe(res => this.listProducts = new MatTableDataSource(res))
    });
  }
}
