import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';
import { MatTableDataSource } from '@angular/material/table';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(products: MatTableDataSource<Product>, searchQuery: string): MatTableDataSource<Product> {
    if (!products || !searchQuery) {
      return products;
    }
    const query = searchQuery.toLowerCase().trim();
    
    return new MatTableDataSource(
      products.data.filter(product =>
        product.name.toLowerCase().includes(query)
      )
    )
  }

}
