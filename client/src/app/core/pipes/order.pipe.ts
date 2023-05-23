import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../models/order.model';
import { MatTableDataSource } from '@angular/material/table';

@Pipe({
  name: 'orderSearch'
})
export class OrderPipe implements PipeTransform {
  transform(orders: MatTableDataSource<Order>, searchQuery: string): MatTableDataSource<Order> {
    if (!orders || !searchQuery) {
      return orders;
    }

    const query = searchQuery.toLowerCase().trim();
    return new MatTableDataSource(
      orders.data.filter(order =>
        order._id.toString().toLowerCase().includes(query) ||
        order.userId.name.toLowerCase().includes(query)
      )
    );
  }

}
