import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { DataModalSelectionService } from "@services/modals/data-modals";
import { Subscription } from "rxjs";
import { IndicatorInfo } from "@interfaces/indicator.interface";
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-strategy",
  templateUrl: "./edit-strategy.modal.html",
  styleUrls: ["./edit-strategy.modal.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditStrategyModal implements OnInit, OnDestroy {
  private subSelectedStrategy: Subscription;

  public selectedStrategy: any;
  public indicators: IndicatorInfo[];
  public indicatorToEdit: IndicatorInfo;

  public form: FormGroup;

  constructor(
    private readonly modalService: BsModalService,
    private readonly fb: FormBuilder,
    private readonly strategySelectionService: DataModalSelectionService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.initSubscriptions();
  }

  private initSubscriptions() {
    this.subSelectedStrategy =
      this.strategySelectionService.selectedDataModal$.subscribe((strategy) => {
        this.selectedStrategy = strategy;
      });
  }

  public onDismiss(): void {
    this.subSelectedStrategy.unsubscribe();
    this.modalService.hide();
  }

  public onPopoverSave(response: IndicatorInfo, popover: NgbPopover): void {
    if (this.indicatorToEdit) this.indicatorToEdit = undefined;
    if (!this.indicators) this.indicators = [];

    if (response?.provisionalID) {
      this.indicators[response?.provisionalID - 1] = response;
    } else this.indicators.push(response);
    popover.close();
  }

  public onDelete(index: number): void {
    this.indicators.splice(index, 1);
  }

  public onEdit(
    indicator: IndicatorInfo,
    index: number,
    popover: NgbPopover
  ): void {
    this.indicatorToEdit = indicator;
    this.indicatorToEdit["provisionalID"] = index + 1;
    popover.open();
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: ["", Validators.required],
      stoploss: [null, Validators.required],
      takeprofit: [null, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subSelectedStrategy.unsubscribe();
  }
}
