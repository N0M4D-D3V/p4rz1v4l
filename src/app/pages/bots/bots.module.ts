import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BotsRoutingModule } from "./bots-routing.module";
import { BotsPage } from "./bots.page";

@NgModule({
  declarations: [BotsPage],
  exports: [BotsPage],
  imports: [CommonModule, BotsRoutingModule],
  providers: [],
  bootstrap: [],
})
export class BotsModule {}
