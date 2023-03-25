import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SimpleCardModule } from "@components/simple-card/simple-card.module";
import { EditStrategyModalModule } from "@modals/edit-strategy/edit-strategy-modal.module";
import { StrategiesRoutingModule } from "./strategies-routing.module";
import { StrategiesPage } from "./strategies.page";

@NgModule({
  declarations: [StrategiesPage],
  exports: [StrategiesPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StrategiesRoutingModule,
    SimpleCardModule,
    EditStrategyModalModule,
  ],
  providers: [],
  bootstrap: [],
})
export class StrategiesModule {}
