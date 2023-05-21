import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { IndexAdminComponent } from './index-admin/index-admin.component';
import { ProductsAdminComponent } from './products-admin/products-admin.component';

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
      path:'users',
      loadChildren: () => import('./users-admin/users-admin.module').then(m => m.UsersAdminModule)
     },
      {
        path: 'products',
        component: ProductsAdminComponent
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
