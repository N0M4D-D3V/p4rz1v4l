import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BacktestPage } from "./backtest.page";

const routes: Routes = [
  {
    path: "",
    component: BacktestPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BacktestRoutingModule {}
