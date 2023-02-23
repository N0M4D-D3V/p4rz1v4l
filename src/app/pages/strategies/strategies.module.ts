import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SimpleCardModule } from "@components/simple-card/simple-card.module";
import { StrategiesRoutingModule } from "./strategies-routing.module";
import { StrategiesPage } from "./strategies.page";

@NgModule({
  declarations: [StrategiesPage],
  exports: [StrategiesPage],
  imports: [CommonModule, StrategiesRoutingModule, SimpleCardModule],
  providers: [],
  bootstrap: [],
})
export class StrategiesModule {}
