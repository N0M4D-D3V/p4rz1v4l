import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { BacktestResult } from "@interfaces/backtest.interface";
import { ChartIncomeBotService } from "@services/modals/chart-income-bot.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-bot",
  templateUrl: "./chart-income-bot-modal.html",
  styleUrls: ["./chart-income-bot-modal.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartIncomeBotModalComponent implements OnInit, OnDestroy {
  private resultsSubscriptionBacktest: Subscription;
  public resultsInfo: BacktestResult;
  public resultsData: BacktestResult;

  constructor(
    private readonly modalService: BsModalService,
    private readonly chartIncomeBotService: ChartIncomeBotService
  ) {}

  ngOnInit(): void {
    this.getAllSubscriptions();
  }

  private getAllSubscriptions(): void {
    this.getResultsInfoSubscription();
    this.getResultsDataSubscription();
  }

  private getResultsInfoSubscription() {
    this.resultsSubscriptionBacktest =
      this.chartIncomeBotService.resultsInfo$.subscribe((data) => {
        this.resultsInfo = data;
      });
  }

  private getResultsDataSubscription() {
    this.resultsSubscriptionBacktest =
      this.chartIncomeBotService.resultsData$.subscribe((data) => {
        this.resultsData = data;
      });
  }

  public onDismiss(): void {
    this.modalService.hide();
  }

  ngOnDestroy(): void {
    this.resultsSubscriptionBacktest.unsubscribe();
  }
}
