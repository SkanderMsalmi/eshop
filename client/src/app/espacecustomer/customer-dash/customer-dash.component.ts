import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dash',
  templateUrl: './customer-dash.component.html',
  styleUrls: ['./customer-dash.component.scss']
})
export class CustomerDashComponent implements OnInit {
  orders = [];
  constructor() {}

  ngOnInit(): void {
    this.orders = [
      {
        id: 'e5dcdfsf',
        orderBy: 'Dean Lynch',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'complated',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Lynch Dean',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'pending',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Lynch Dean',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'rejected',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Dean Lynch',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'initialized',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Dean Lynch',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'complated',
        price: 2145.0
      }
    ];
  }
  }
 

