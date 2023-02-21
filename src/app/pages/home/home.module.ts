import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";
import { HomePage } from "./home.page";

@NgModule({
  declarations: [HomePage],
  exports: [HomePage],
  imports: [CommonModule, HomeRoutingModule],
  providers: [],
  bootstrap: [],
})
export class HomeModule {}
