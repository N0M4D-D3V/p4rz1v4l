import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomePage } from "./home.page";

@NgModule({
  declarations: [HomePage],
  exports: [HomePage],
  imports: [CommonModule],
  providers: [],
  bootstrap: [],
})
export class HomeModule {}
