import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SimpleCardModule } from "@components/simple-card/simple-card.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomePage } from "./home.page";

@NgModule({
  declarations: [HomePage],
  exports: [HomePage],
  imports: [CommonModule, HomeRoutingModule, SimpleCardModule],
  providers: [],
  bootstrap: [],
})
export class HomeModule {}
