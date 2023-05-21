import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {
  path: '',
    component: UsersListComponent,
    
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
  
   {
    path:'user/:id',
    component: UserDetailComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersAdminRoutingModule { }
