import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from 'src/app/core/models/product.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {

  @ViewChild(MatPaginator) paginator : MatPaginator;
  listProducts : Product[]
  selectedProduct : Product;
  itemsPerPage = 10;
  currentPage = 0;
  constructor(private productsService : ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(result => this.listProducts = result);
  }

  onPageChange(event : PageEvent){
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }

  deleteProduct(product : Product) : void{
    this.productsService.deleteProduct(product);
    this.listProducts = this.listProducts.filter(p => p._id != product._id);
  }

  select(product : Product){
    this.selectedProduct = product;
  }

  handleProduct(){
    this.listProducts = this.listProducts.filter(p => p._id != this.selectedProduct._id);
    this.selectedProduct = null;
  }

}
