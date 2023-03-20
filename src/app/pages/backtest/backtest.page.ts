import { Component, OnInit } from "@angular/core";
import { Strategy } from "@interfaces/strategies.interface";
import { EditStrategyModal } from "@modals/edit-strategy/edit-strategy.modal";
import { ExchangeService } from "@services/exchange/exchange.service";
import { StrategyService } from "@services/strategy/strategy.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-backtest",
  templateUrl: "./backtest.page.html",
  styleUrls: ["./backtest.page.scss"],
})
export class BacktestPage implements OnInit {
  public strategiesObs$: Observable<Strategy[]>;
  public exchangeList: string[] = [];

  constructor(
    private readonly modalService: BsModalService,
    private readonly exchangeService: ExchangeService,
    private readonly strategyService: StrategyService
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
    this.exchangeList = this.exchangeService.getExchanges();
  }

  private initSubscriptions(): void {
    this.strategiesObs$ = this.strategyService
      .getObservable()
      .pipe(filter((res: Strategy[]) => !!res));
  }

  public onEdit(): void {
    this.modalService.show(EditStrategyModal);
  }
}
