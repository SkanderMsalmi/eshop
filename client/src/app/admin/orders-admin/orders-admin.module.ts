import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersAdminRoutingModule } from './orders-admin-routing.module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { OrdersCardComponent } from './orders-card/orders-card.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderPipe } from 'src/app/core/pipes/order.pipe';
const commonModules = [
  HttpClientModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatDialogModule,
  MatFormFieldModule
];

@NgModule({
  declarations: [
    OrderPipe,
    OrdersListComponent,
    OrdersDetailComponent,
    OrdersCardComponent
  ],
  imports: [
    CommonModule,
    OrdersAdminRoutingModule,
    ...commonModules,
    FormsModule,
    
  ],
  exports:[
    ...commonModules,

  ]
})
export class OrdersAdminModule { }
