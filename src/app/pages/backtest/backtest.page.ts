import { Component, OnDestroy, OnInit } from "@angular/core";
import { Strategy } from "@interfaces/strategies.interface";
import { EditStrategyModal } from "@modals/edit-strategy/edit-strategy.modal";
import { ExchangeService } from "@services/exchange/exchange.service";
import { StrategyService } from "@services/strategy/strategy.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Exchange } from "ccxt";
import { ExchangeFactoryService } from "@services/exchange/exchange-factory.service";

@Component({
  selector: "app-backtest",
  templateUrl: "./backtest.page.html",
  styleUrls: ["./backtest.page.scss"],
})
export class BacktestPage implements OnInit, OnDestroy {
  private subStrategies: Subscription;
  private subStratID: Subscription;
  private subExchange: Subscription;

  public exchange: Exchange;

  public strategies$: Observable<Strategy[]>;
  public strategies: Strategy[];
  public exchangeList: string[] = [];
  public form: FormGroup;
  public isEditAvailable: boolean = false;

  public markets: string[];

  constructor(
    private readonly modalService: BsModalService,
    private readonly fb: FormBuilder,
    private readonly exchangeFactory: ExchangeFactoryService,
    private readonly exchangeService: ExchangeService,
    private readonly strategyService: StrategyService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.initSubscriptions();
    this.exchangeList = this.exchangeService.getExchanges();
  }

  private initSubscriptions(): void {
    this.strategies$ = this.strategyService
      .getObservable()
      .pipe(filter((res: Strategy[]) => !!res));
    this.subStrategies = this.strategies$.subscribe((strategies: Strategy[]) =>
      this.onStrategies(strategies)
    );

    this.subStratID = this.form
      .get("stratID")
      .valueChanges.pipe(filter((index: number) => !!index))
      .subscribe((index: number) => {
        this.strategyService.selectedStrategy = this.strategies[index];
        this.isEditAvailable = true;
      });

    this.subExchange = this.form
      .get("exchange")
      .valueChanges.pipe(filter((name: string) => !!name))
      .subscribe(async (name: string) => {
        this.form.get("market").disable();
        this.exchange = this.exchangeFactory.getInstance(name);
        await this.exchange.loadMarkets();
        this.form.get("market").enable();
      });
  }

  public onStrategies(strategies: Strategy[]): void {
    this.strategies = strategies;
    this.form.get("stratID").setValue(null);
  }

  public onEdit(): void {
    this.modalService.show(EditStrategyModal);
  }

  private createForm(): void {
    this.form = this.fb.group({
      stratID: [null, Validators.required],
      exchange: ["", Validators.required],
      market: [{ value: "", disabled: true }, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.strategyService.clearSelectedStrategy();
    this.subStrategies.unsubscribe();
    this.subStratID.unsubscribe();
    this.subExchange.unsubscribe();
  }
}
