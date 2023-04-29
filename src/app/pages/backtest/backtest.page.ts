import { Component, OnDestroy, OnInit } from "@angular/core";
import { EditStrategyModalComponent } from "@modals/edit-strategy/edit-strategy.modal";
import { ExchangeService } from "@services/exchange/exchange.service";
import { StrategyService } from "@services/strategy/strategy.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Exchange } from "ccxt";
import { ExchangeFactoryService } from "@services/exchange/exchange-factory.service";
import { AVAILABLE_EXCHANGES } from "@common/available-indicator.list";
import { BacktestCandle, Candle } from "@interfaces/candle";
import { Backtester } from "@models/backtest/backtester.model";
import { Strategy } from "@models/strategy/estrategy.model";
import { BacktestResult } from "@interfaces/backtest.interface";
import { ChartIncomeBotModalComponent } from "@modals/chart-income-bot/chart-income-bot-modal";
import { ChartIncomeBotService } from "@services/modals/chart-income-bot.service";

@Component({
  selector: "app-backtest",
  templateUrl: "./backtest.page.html",
  styleUrls: ["./backtest.page.scss"],
})
export class BacktestPage implements OnInit, OnDestroy {
  private subStrategies: Subscription;
  private subStratID: Subscription;
  private subExchange: Subscription;
  private subMarket: Subscription;

  private get stratIDControl(): AbstractControl {
    return this.form.get("stratID");
  }

  private get exchangeControl(): AbstractControl {
    return this.form.get("exchange");
  }

  private get marketControl(): AbstractControl {
    return this.form.get("market");
  }

  private get limitControl(): AbstractControl {
    return this.form.get("limit");
  }

  private get timeframeControl(): AbstractControl {
    return this.form.get("timeframe");
  }

  private get balanceControl(): AbstractControl {
    return this.form.get("balance");
  }

  private get leverageControl(): AbstractControl {
    return this.form.get("leverage");
  }

  private get stoplossControl(): AbstractControl {
    return this.form.get("stoploss");
  }

  private get feeControl(): AbstractControl {
    return this.form.get("feePercentage");
  }

  private get from(): AbstractControl {
    return this.form.get("from");
  }

  private get to(): AbstractControl {
    return this.form.get("to");
  }

  private get strategy(): Strategy {
    return this.strategies.find(
      (strat: Strategy) => +strat.id === +this.stratIDControl.value
    );
  }

  public exchange: Exchange;

  public strategies$: Observable<Strategy[]>;
  public strategies: Strategy[];
  public exchangeList: string[] = [];
  public form: FormGroup;
  public isEditAvailable: boolean = false;

  public markets: string[];
  public results: BacktestResult;

  constructor(
    private readonly modalService: BsModalService,
    private readonly fb: FormBuilder,
    private readonly exchangeFactory: ExchangeFactoryService,
    private readonly exchangeService: ExchangeService,
    private readonly strategyService: StrategyService,
    private readonly chartIncomeBotService: ChartIncomeBotService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.initSubscriptions();
    this.exchangeList = AVAILABLE_EXCHANGES;
  }

  private initSubscriptions(): void {
    this.strategies$ = this.strategyService
      .getObservable()
      .pipe(filter((res: Strategy[]) => !!res));
    this.subStrategies = this.strategies$.subscribe((strategies: Strategy[]) =>
      this.onStrategies(strategies)
    );

    this.subStratID = this.stratIDControl.valueChanges
      .pipe(filter((index: number) => !!index))
      .subscribe((index: number) => {
        this.strategyService.selectedStrategy = this.strategies[index];
        this.isEditAvailable = true;
      });

    this.subExchange = this.exchangeControl.valueChanges
      .pipe(filter((name: string) => !!name))
      .subscribe(async (name: string) => await this.onExchangeChange(name));

    this.subMarket = this.marketControl.valueChanges
      .pipe(filter((symbol: string) => !!symbol))
      .subscribe(async (symbol: string) => {
        const fee: number = this.exchange.markets[symbol].maker;
        this.feeControl.setValue(fee * 100);
      });
  }

  private async onExchangeChange(name: string): Promise<void> {
    this.marketControl.disable();
    this.timeframeControl.disable();
    this.limitControl.disable();

    this.exchange = this.exchangeFactory.getInstance(name);
    await this.exchange.loadMarkets();

    this.marketControl.enable();
    this.timeframeControl.enable();
    this.limitControl.enable();
  }

  public onStrategies(strategies: Strategy[]): void {
    this.strategies = strategies;
    this.stratIDControl.setValue(null);
  }

  public onEdit(): void {
    this.strategyService.selectedStrategy = this.strategy;
    this.modalService.show(EditStrategyModalComponent);
  }

  public async onTest(): Promise<void> {
    this.results = undefined;

    const market: string = this.marketControl.value;
    const timeframe: string = this.timeframeControl.value;
    const limit = this.limitControl.value;
    const feePercentage: number = this.feeControl.value;
    const balance: number = this.balanceControl.value;
    const leverage: number = this.leverageControl.value;
    const stoploss: boolean = this.stoplossControl.value;
    const from: string = this.from.value;
    const to: string = this.to.value;
    const strategy: Strategy = this.strategy;

    this.exchangeService.setExchange(this.exchange);
    const candles: Candle[] = await this.exchangeService.getBetween(
      {
        symbol: market,
        timeframe: timeframe,
        limit: limit,
      },
      from,
      to
    );

    const backtester: Backtester = new Backtester({
      initialBalance: balance,
      leverage: leverage,
      trailingStoploss: stoploss,
      feeCostPercentage: feePercentage,
      stoplossPercentage: strategy.stoploss,
      takeprofitPercentage: strategy.takeprofit,
    });

    const candleResults: BacktestCandle[] = await backtester.execute(
      candles,
      strategy
    );

    this.results = backtester.getResults(
      market,
      candleResults[0]?.timestamp,
      candleResults[candleResults.length - 1]?.timestamp
    );

    this.chartIncomeBotService.infoResults(this.results);
    this.chartIncomeBotService.dataResults(candles);
    this.modalService.show(ChartIncomeBotModalComponent);
  }

  private createForm(): void {
    this.form = this.fb.group({
      stratID: [null, Validators.required],
      exchange: ["", Validators.required],
      market: [{ value: "", disabled: true }, Validators.required],
      timeframe: [{ value: "", disabled: true }, Validators.required],
      limit: [{ value: "", disabled: true }, Validators.required], //candles
      balance: [1000, Validators.required],
      leverage: [1, Validators.required],
      stoploss: [true, Validators.required],
      feePercentage: [{ value: "", disabled: true }, Validators.required],
      from: [null],
      to: [null],
    });
  }

  ngOnDestroy(): void {
    this.strategyService.clearSelectedStrategy();
    this.subStrategies.unsubscribe();
    this.subStratID.unsubscribe();
    this.subExchange.unsubscribe();
    this.subMarket.unsubscribe();
  }
}
