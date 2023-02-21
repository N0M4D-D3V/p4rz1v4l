import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GeneticAlgorithmsPage } from "./genetic-algorithms.page";

@NgModule({
  declarations: [GeneticAlgorithmsPage],
  exports: [GeneticAlgorithmsPage],
  imports: [CommonModule],
  providers: [],
  bootstrap: [],
})
export class GeneticAlgorithmsModule {}
