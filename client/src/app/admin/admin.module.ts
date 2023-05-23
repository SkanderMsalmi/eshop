import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { IndexAdminComponent } from './index-admin/index-admin.component';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { AdminComponent } from './admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { UsersAdminModule } from './users-admin/users-admin.module';
import { OrdersAdminModule } from './orders-admin/orders-admin.module';

import { FormsModule } from '@angular/forms';
import { FormProductComponent } from './form-product/form-product.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { MatRadioModule } from "@angular/material/radio";
import { ProductSearchPipe } from '../core/pipes/product-search.pipe';

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
  MatPaginatorModule,
  MatTableModule,
  MatRadioModule
];

@NgModule({
  declarations: [
    
    FooterAdminComponent,
       HeaderAdminComponent,
       SidebarAdminComponent,
       IndexAdminComponent,
       ProductsAdminComponent,
       AdminComponent,
       FormProductComponent,
       ProductDetailsComponent,
       DialogDeleteComponent,
       ProductSearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,

     ...commonModules,
     UsersAdminModule,
     OrdersAdminModule,
    SharedModule,

  ],
  exports:[
    ...commonModules
  ]
})
export class AdminModule { }
