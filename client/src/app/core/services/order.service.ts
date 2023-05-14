import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }

  postNewOrder(order: Order) : Observable<Order> {
    return this.http.post<Order>(`/api/order/new`,order);
  }
}
