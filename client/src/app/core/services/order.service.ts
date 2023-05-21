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
  getOrdersByUser(id:string):Observable<any>{
    return this.http.get(`/api/order/getOrdersByUser/${id}`);
  }
  getOrderById(id):Observable<any>{
    return this.http.get(`/api/order/${id}`);
  }
  changeStatus(id,status):Observable<any>{
    const body = {status}
    return this.http.put<string>(`/api/order/changestatus/${id}`,body);
  }

  deleteOrderById(id):Observable<any>{
    return this.http.delete(`api/order/delete/${id}`);
  }
  deleteAllOrders():Observable<any>{
    return this.http.delete(`api/order/delete`);
  }

}
