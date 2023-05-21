import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgParticlesModule } from "ng-particles";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { ProductModule } from "../product/product.module";
import { SharedModule } from "../shared/shared.module";
import { HomeCardsComponent } from "./home-cards/home-cards.component";
import { HomeProductsComponent } from "./home-products/home-products.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";


@NgModule({
  declarations: [HomeComponent, HomeProductsComponent, HomeCardsComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, NgParticlesModule, ProductModule,NgxSkeletonLoaderModule]
})
export class HomeModule {}
