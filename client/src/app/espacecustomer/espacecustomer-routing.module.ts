import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashComponent } from './customer-dash/customer-dash.component';
import { CustomerSavedItemComponent } from './customer-saved-item/customer-saved-item.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';


const CustomerChildrenRoute: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CustomerDashComponent
  },
  {
    path: 'saved-items',
    component: CustomerSavedItemComponent
  },
  {
    path: 'profile',
    component: CustomerProfileComponent
  },
  {
    path: 'orders',
    component: CustomerOrderComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: CustomerChildrenRoute
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
