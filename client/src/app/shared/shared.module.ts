import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeatureComponent } from './components/feature/feature.component';
import { MatCardModule } from '@angular/material/card';
import { BaseLayoutComponent } from './components/layouts/base-layout/base-layout.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MatMenuModule } from '@angular/material/menu';
import { CartComponent } from './components/cart/cart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

import { DialogStatusComponent } from './components/dialog-status/dialog-status.component';
import {MatSelectModule} from '@angular/material/select'
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

import { ChipsComponent } from './components/chips/chips.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

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

  MatSelectModule,
   MatAutocompleteModule,
  MatChipsModule,
  MatFormFieldModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, FeatureComponent, BaseLayoutComponent, LoaderComponent, SidenavComponent, CarouselComponent, CartComponent, DialogComponent, DialogStatusComponent, ConfirmationDialogComponent],
  imports: [CommonModule,FormsModule , RouterModule, ...commonModules],
  exports: [HeaderComponent, FooterComponent, BaseLayoutComponent, FeatureComponent, LoaderComponent, SidenavComponent,CarouselComponent, ...commonModules]

})
export class SharedModule {}
