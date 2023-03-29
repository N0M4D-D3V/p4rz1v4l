import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { BacktestResult } from "@interfaces/backtest.interface";

@Component({
  selector: "app-backtest-result",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
})
export class ResultsComponent implements OnInit {
  @Input() results: BacktestResult;

  constructor() {}

  ngOnInit(): void {}
}
