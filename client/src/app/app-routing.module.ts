import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/components/layouts/base-layout/base-layout.component';
import { DataUserGuard } from './shared/guards/data-user.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const baseLayoutRouting: Routes = [
  {
    path: 'products',
    
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  {
    path:'espace',
    canActivate:[DataUserGuard,AuthGuard],
    loadChildren: () => import('./espacecustomer/espacecustomer.module').then(m => m.EspacecustomerModule)

  },
  {
    path: '',
    pathMatch: 'full',
    canActivate:[DataUserGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  }

];

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: baseLayoutRouting
  },
  {
    path: 'auth',
    canActivate:[DataUserGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
