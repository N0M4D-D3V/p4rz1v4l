import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EditStrategyModalModule } from "@modals/edit-strategy/edit-strategy-modal.module";
import { GeneticAlgorithmsRoutingModule } from "./genetic-algorithms-routing.module";
import { GeneticAlgorithmsPage } from "./genetic-algorithms.page";

@NgModule({
  declarations: [GeneticAlgorithmsPage],
  exports: [GeneticAlgorithmsPage],
  imports: [
    CommonModule,
    GeneticAlgorithmsRoutingModule,
    EditStrategyModalModule,
  ],
  providers: [],
  bootstrap: [],
})
export class GeneticAlgorithmsModule {}
