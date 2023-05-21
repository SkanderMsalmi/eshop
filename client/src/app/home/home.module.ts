import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeProductsComponent } from './home-products/home-products.component';
import { NgParticlesModule } from 'ng-particles';
import { HomeCardsComponent } from './home-cards/home-cards.component';
import { ProductModule } from '../product/product.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [HomeComponent, HomeProductsComponent, HomeCardsComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, NgParticlesModule, ProductModule,NgxSkeletonLoaderModule]
})
export class HomeModule {}
