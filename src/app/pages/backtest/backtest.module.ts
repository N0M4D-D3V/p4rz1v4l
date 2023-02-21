import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BacktestPage } from "./backtest.page";

@NgModule({
  declarations: [BacktestPage],
  exports: [BacktestPage],
  imports: [CommonModule],
  providers: [],
  bootstrap: [],
})
export class BacktestModule {}
