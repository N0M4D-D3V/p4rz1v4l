import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { DataModalSelectionService } from "@services/modals/data-modals";
import { Subscription } from "rxjs";
import { IndicatorInfo } from "../../interfaces/indicator.interface";
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-edit-strategy",
  templateUrl: "./edit-strategy.modal.html",
  styleUrls: ["./edit-strategy.modal.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditStrategyModal implements OnInit {
  private selectedStrategySub: Subscription;
  public selectedStrategy: any;
  public indicators: IndicatorInfo[];

  constructor(
    private readonly modalService: BsModalService,
    private readonly strategySelectionService: DataModalSelectionService
  ) {}

  ngOnInit(): void {
    this.getDataModal();
  }

  private getDataModal() {
    this.selectedStrategySub =
      this.strategySelectionService.selectedDataModal$.subscribe((strategy) => {
        this.selectedStrategy = strategy;
      });
  }

  public onDismiss(): void {
    this.selectedStrategySub.unsubscribe();
    this.modalService.hide();
  }

  public onPopoverSave(response: IndicatorInfo, popover: NgbPopover): void {
    if (!this.indicators) this.indicators = [];
    this.indicators.push(response);
    popover.close();
  }

  public onDelete(index: number): void {
    this.indicators.splice(index, 1);
  }

  public onEdit(label: string): void {
    alert("EDIT " + label);
  }
}
