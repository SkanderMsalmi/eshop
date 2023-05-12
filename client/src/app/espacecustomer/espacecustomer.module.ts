import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { CustomerSavedItemComponent } from './customer-saved-item/customer-saved-item.component';
import { CustomerDashComponent } from './customer-dash/customer-dash.component';
import { CustomerRoutingModule } from './espacecustomer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CustomerProfileComponent,
    CustomerLayoutComponent,
    CustomerOrderComponent,
    CustomerSavedItemComponent,
    CustomerDashComponent,

  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EspacecustomerModule { }
