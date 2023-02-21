import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StrategiesRoutingModule } from "./strategies-routing.module";
import { StrategiesPage } from "./strategies.page";

@NgModule({
  declarations: [StrategiesPage],
  exports: [StrategiesPage],
  imports: [CommonModule, StrategiesRoutingModule],
  providers: [],
  bootstrap: [],
})
export class StrategiesModule {}
