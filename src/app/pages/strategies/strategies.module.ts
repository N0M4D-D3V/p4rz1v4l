import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SimpleCardModule } from "@components/simple-card/simple-card.module";
import { EditStrategyModalModule } from "@modals/edit-strategy/edit-strategy-modal.module";
import { StrategiesRoutingModule } from "./strategies-routing.module";
import { StrategiesPage } from "./strategies.page";

@NgModule({
  declarations: [StrategiesPage],
  exports: [StrategiesPage],
  imports: [
    CommonModule,
    StrategiesRoutingModule,
    SimpleCardModule,
    EditStrategyModalModule,
  ],
  providers: [],
  bootstrap: [],
})
export class StrategiesModule {}
