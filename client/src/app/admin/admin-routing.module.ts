import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { IndexAdminComponent } from './index-admin/index-admin.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { FormProductComponent } from './form-product/form-product.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: IndexAdminComponent
      },
      {
        path: 'users',
        component: UsersAdminComponent
      },
      {
        path: 'products',
        component: ProductsAdminComponent
      },
      {
        path:'addProduct',
        component: FormProductComponent
      },
      {
        path :'editProduct/:id',
        component : FormProductComponent
      }
      // Define child routes for admin module here
      // Example:
      // { path: 'dashboard', component: DashboardComponent },
      // { path: 'users', component: UsersComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
