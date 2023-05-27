import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/store';
import { AdminGuard } from './shared/guards/AdminGuard.guard';
import { CustomerGuard } from './shared/guards/CustomerGuard.guard';

@NgModule({
  declarations: [AppComponent  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule, NgxSkeletonLoaderModule,HttpClientModule, 
    StoreModule.forRoot(reducers)],
  providers: [AdminGuard,CustomerGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
