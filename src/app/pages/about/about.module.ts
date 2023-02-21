import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AboutRoutingModule } from "./about-routing.module";
import { AboutPage } from "./about.page";

@NgModule({
  declarations: [AboutPage],
  exports: [AboutPage],
  imports: [CommonModule, AboutRoutingModule],
  providers: [],
  bootstrap: [],
})
export class AboutModule {}
