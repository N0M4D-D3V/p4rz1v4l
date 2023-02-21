import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GeneticAlgorithmsPage } from "./genetic-algorithms.page";

const routes: Routes = [
  {
    path: "",
    component: GeneticAlgorithmsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneticAlgorithmsRoutingModule {}
