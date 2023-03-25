import { Component, OnDestroy, OnInit } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { IndicatorInfo } from "@interfaces/indicator.interface";
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StrategyService } from "@services/strategy/strategy.service";
import { Strategy } from "@models/strategy/estrategy.model";

@Component({
  selector: "app-edit-strategy",
  templateUrl: "./edit-strategy.modal.html",
  styleUrls: ["./edit-strategy.modal.scss"],
})
export class EditStrategyModal implements OnInit, OnDestroy {
  public selectedStrategy: Strategy;
  public indicators: IndicatorInfo[];
  public indicatorToEdit: IndicatorInfo;

  public form: FormGroup;

  constructor(
    private readonly modalService: BsModalService,
    private readonly fb: FormBuilder,
    private readonly strategyService: StrategyService
  ) {}

  ngOnInit(): void {
    this.selectedStrategy = this.strategyService.selectedStrategy;
    this.createForm();
  }

  public onDismiss(): void {
    this.modalService.hide();
  }

  public onSaveIndicator(response: IndicatorInfo, popover: NgbPopover): void {
    if (this.indicatorToEdit) this.indicatorToEdit = undefined;
    if (!this.indicators) this.indicators = [];

    if (response?.provisionalID) {
      this.indicators[response?.provisionalID - 1] = response;
    } else this.indicators.push(response);
    popover.close();
  }

  public onDeleteIndicator(index: number): void {
    this.indicatorToEdit = undefined;
    this.indicators.splice(index, 1);
  }

  public onEditIndicator(
    indicator: IndicatorInfo,
    index: number,
    popover: NgbPopover
  ): void {
    this.indicatorToEdit = indicator;
    this.indicatorToEdit["provisionalID"] = index + 1;
    popover.open();
  }

  public onSaveStrategy(): void {
    const formValue = this.form.value;
    const strategy: Strategy = new Strategy(
      this.selectedStrategy?.id,
      formValue.name,
      formValue.stoploss,
      formValue.takeprofit,
    this.indicators,
    );

    this.onDismiss();
    this.strategyService.updateOne(strategy);
  }

  public onDeleteStrategy(): void {
    this.onDismiss();
    this.strategyService.deleteOne(this.selectedStrategy);
  }

  private createForm(): void {
    if (this.selectedStrategy) this.createFilledForm();
    else this.createEmptyForm();
  }

  private createEmptyForm(): void {
    this.form = this.fb.group({
      name: ["", Validators.required],
      stoploss: [null, Validators.required],
      takeprofit: [null, Validators.required],
    });
  }

  private createFilledForm(): void {
    this.indicators = this.selectedStrategy.indicators;
    this.form = this.fb.group({
      name: [this.selectedStrategy.name, Validators.required],
      stoploss: [this.selectedStrategy.stoploss, Validators.required],
      takeprofit: [this.selectedStrategy.takeprofit, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.strategyService.clearSelectedStrategy();
  }
}
