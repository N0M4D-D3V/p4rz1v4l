import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AboutPage } from "./about.page";

@NgModule({
  declarations: [AboutPage],
  exports: [AboutPage],
  imports: [CommonModule],
  providers: [],
  bootstrap: [],
})
export class AboutModule {}
