import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BacktestRoutingModule } from "./backtest-routing.module";
import { BacktestPage } from "./backtest.page";

@NgModule({
  declarations: [BacktestPage],
  exports: [BacktestPage],
  imports: [CommonModule, BacktestRoutingModule],
  providers: [],
  bootstrap: [],
})
export class BacktestModule {}
