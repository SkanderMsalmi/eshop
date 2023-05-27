import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from 'src/app/core/models/product.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from "../components/dialog-delete/dialog-delete.component";
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

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
  view = "list"
  searchQuery: string = '';

  constructor(private productsService : ProductsService, private dialog : MatDialog, private elementRef: ElementRef) { }

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
    setTimeout(() => {
      let element = document.getElementById("details")
      element.scrollIntoView({behavior:'smooth'})
    }, 100);
  }

  handleProduct(){
    this.listProducts = new MatTableDataSource(this.listProducts.data.filter(p => p._id != this.selectedProduct._id));
    this.selectedProduct = null;
  }

  closeDetails(){
    let element = document.getElementById("list");
    element.scrollIntoView({behavior:'smooth'})
    this.selectedProduct = null;
  }

  openDialog(product : Product){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this product?' }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.productsService.deleteProduct(product);
      this.ngOnInit();
    });
  }
}
