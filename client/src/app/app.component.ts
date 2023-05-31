import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from './store/store';
import { LoadCartAction } from './store/actions/cart.action';

@Component({
  selector: 'll-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private store : Store<StoreInterface> ){}
  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(){
    this.store.dispatch(new LoadCartAction());
  }
}
