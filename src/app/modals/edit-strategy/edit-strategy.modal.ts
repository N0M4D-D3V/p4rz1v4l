import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs";
import { IndicatorInfo } from "@interfaces/indicator.interface";
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Strategy } from "@interfaces/strategies.interface";
import {
  DataTransfer,
  DataTransferAction,
} from "@interfaces/data-transfer.interface";
import { DataTransferService } from "@services/modals/data-transfer.service";

@Component({
  selector: "app-edit-strategy",
  templateUrl: "./edit-strategy.modal.html",
  styleUrls: ["./edit-strategy.modal.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditStrategyModal implements OnInit, OnDestroy {
  private subSelectedStrategy: Subscription;

  public selectedStrategy: DataTransfer<Strategy>;
  public indicators: IndicatorInfo[];
  public indicatorToEdit: IndicatorInfo;

  public form: FormGroup;

  constructor(
    private readonly modalService: BsModalService,
    private readonly fb: FormBuilder,
    private readonly dataTransferService: DataTransferService<Strategy>
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  private initSubscriptions() {
    this.subSelectedStrategy = this.dataTransferService
      .getObservable()
      .subscribe((data: DataTransfer<Strategy>) => this.onDataTransfer(data));
  }

  private onDataTransfer(data: DataTransfer<Strategy>): void {
    this.selectedStrategy = data;
    this.createForm();
  }

  public onDismiss(): void {
    this.subSelectedStrategy.unsubscribe();
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
    const strategy: Strategy = {
      name: formValue.name,
      stoploss: formValue.stoploss,
      takeprofit: formValue.takeprofit,
      indicators: this.indicators,
    };

    this.selectedStrategy.data = strategy;
    this.selectedStrategy.action = DataTransferAction.SAVE;
    this.onDismiss();
    this.dataTransferService.setSelectedDataModal(this.selectedStrategy);
  }

  public onDeleteStrategy(): void {
    this.selectedStrategy.action = DataTransferAction.DEL;
    this.onDismiss();
    this.dataTransferService.setSelectedDataModal(this.selectedStrategy);
  }

  private createForm(): void {
    if (this.selectedStrategy?.action === DataTransferAction.EDIT)
      this.createFilledForm();
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
    const strat: Strategy = this.selectedStrategy.data;

    this.indicators = strat.indicators;
    this.form = this.fb.group({
      name: [strat.name, Validators.required],
      stoploss: [strat.stoploss, Validators.required],
      takeprofit: [strat.takeprofit, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subSelectedStrategy.unsubscribe();
  }
}
