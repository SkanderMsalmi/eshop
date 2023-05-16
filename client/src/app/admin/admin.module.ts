import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { IndexAdminComponent } from './index-admin/index-admin.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
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
  MatDialogModule
];

@NgModule({
  declarations: [
  
    FooterAdminComponent,
       HeaderAdminComponent,
       SidebarAdminComponent,
       IndexAdminComponent,
       UsersAdminComponent,
       ProductsAdminComponent,
       AdminComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
     ...commonModules
  ],
  exports:[
    ...commonModules
  ]
})
export class AdminModule { }