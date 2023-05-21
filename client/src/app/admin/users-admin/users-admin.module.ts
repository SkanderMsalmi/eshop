import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersAdminRoutingModule } from './users-admin-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import { UserSearchPipe } from '../../core/pipes/user-search.pipe';

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
  
];

@NgModule({
  declarations: [
    UserSearchPipe,
    UsersListComponent,
    UserCardComponent,
    UserDetailComponent
  ],
  imports: [
    
    MatInputModule,
    CommonModule,
    UsersAdminRoutingModule,
    MatMenuModule,
    FormsModule,
    ...commonModules
  ]
})
export class UsersAdminModule { }
