import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BacktestRoutingModule } from "./backtest-routing.module";
import { BacktestPage } from "./backtest.page";
import { MatFormFieldModule } from "@angular/material/form-field";
import { EditStrategyModalModule } from "@modals/edit-strategy/edit-strategy-modal.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ResultsModule } from "./modules/results/results.module";

@NgModule({
  declarations: [BacktestPage],
  exports: [BacktestPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BacktestRoutingModule,
    MatFormFieldModule,
    EditStrategyModalModule,
    ResultsModule,
  ],
  providers: [],
  bootstrap: [],
})
export class BacktestModule {}
