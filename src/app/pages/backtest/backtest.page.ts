import { Component, OnDestroy, OnInit } from "@angular/core";
import { Strategy } from "@interfaces/strategies.interface";
import { EditStrategyModal } from "@modals/edit-strategy/edit-strategy.modal";
import { ExchangeService } from "@services/exchange/exchange.service";
import { StrategyService } from "@services/strategy/strategy.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-backtest",
  templateUrl: "./backtest.page.html",
  styleUrls: ["./backtest.page.scss"],
})
export class BacktestPage implements OnInit, OnDestroy {
  private subStrategies: Subscription;
  private subStratID: Subscription;

  public strategies: Strategy[];
  public exchangeList: string[] = [];
  public form: FormGroup;
  public isEditAvailable: boolean = false;

  constructor(
    private readonly modalService: BsModalService,
    private readonly fb: FormBuilder,
    private readonly exchangeService: ExchangeService,
    private readonly strategyService: StrategyService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.initSubscriptions();
    this.exchangeList = this.exchangeService.getExchanges();
  }

  private createForm(): void {
    this.form = this.fb.group({
      stratID: [null, Validators.required],
      exchange: ["", Validators.required],
      market: ["", Validators.required],
    });
  }

  private initSubscriptions(): void {
    this.subStrategies = this.strategyService
      .getObservable()
      .pipe(filter((res: Strategy[]) => !!res))
      .subscribe((strategies: Strategy[]) => (this.strategies = strategies));

    this.subStratID = this.form
      .get("stratID")
      .valueChanges.pipe(filter((index: number) => !!index))
      .subscribe((index: number) => {
        this.strategyService.selectedStrategy = this.strategies[index];
        this.isEditAvailable = true;
      });
  }

  public onEdit(): void {
    this.modalService.show(EditStrategyModal);
  }

  ngOnDestroy(): void {
    this.strategyService.clearSelectedStrategy();
    this.subStrategies.unsubscribe();
    this.subStratID.unsubscribe();
  }
}
