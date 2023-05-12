import { Component, OnInit } from '@angular/core';
import { productsDB } from 'src/app/shared/data/products';

@Component({
  selector: 'app-customer-saved-item',
  templateUrl: './customer-saved-item.component.html',
  styleUrls: ['./customer-saved-item.component.scss']
})
export class CustomerSavedItemComponent implements OnInit {

  view = 'list';

  products;
  constructor() {}

  ngOnInit(): void {
    this.products = productsDB.Product;
  }

}
