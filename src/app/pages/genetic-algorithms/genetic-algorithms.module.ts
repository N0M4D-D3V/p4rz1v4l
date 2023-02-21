import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GeneticAlgorithmsRoutingModule } from "./genetic-algorithms-routing.module";
import { GeneticAlgorithmsPage } from "./genetic-algorithms.page";

@NgModule({
  declarations: [GeneticAlgorithmsPage],
  exports: [GeneticAlgorithmsPage],
  imports: [CommonModule, GeneticAlgorithmsRoutingModule],
  providers: [],
  bootstrap: [],
})
export class GeneticAlgorithmsModule {}
