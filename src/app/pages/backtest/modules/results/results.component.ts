import { Component, Input } from "@angular/core";
import { BacktestResult } from "@interfaces/backtest.interface";

@Component({
  selector: "app-backtest-result",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
})
export class ResultsComponent {
  @Input() results: BacktestResult;

  constructor() {}
}
