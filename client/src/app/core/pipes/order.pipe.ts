import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../models/order.model';

@Pipe({
  name: 'orderSearch'
})
export class OrderPipe implements PipeTransform {
  transform(orders: Order[], searchQuery: string): Order[] {
    if (!orders || !searchQuery) {
      return orders;
    }

    const query = searchQuery.toLowerCase().trim();
    return orders.filter(order =>
      order._id.toString().toLowerCase().includes(query) ||
      order.userId.name.toLowerCase().includes(query)
    );
  }

}
