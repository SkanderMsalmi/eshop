import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';

const routes: Routes = [
  {
    path: '',
      component: OrdersListComponent,
      
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
    
     {
      path:'order/:id',
      component: OrdersDetailComponent
     }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersAdminRoutingModule { }
