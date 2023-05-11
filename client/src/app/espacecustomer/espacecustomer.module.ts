import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { CustomerSavedItemComponent } from './customer-saved-item/customer-saved-item.component';



@NgModule({
  declarations: [
    CustomerProfileComponent,
    CustomerLayoutComponent,
    CustomerOrderComponent,
    CustomerSavedItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EspacecustomerModule { }
