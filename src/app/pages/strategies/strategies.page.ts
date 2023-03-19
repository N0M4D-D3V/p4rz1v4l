import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { EditStrategyModal } from "@modals/edit-strategy/edit-strategy.modal";
import { BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder } from "@angular/forms";
import { Strategy } from "@interfaces/strategies.interface";
import { DataTransferService } from "@services/modals/dara-transfer.service";
import { Subscription } from "rxjs";
import {
  DataTransfer,
  DataTransferAction,
} from "@interfaces/data-transfer.interface";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-strategies",
  templateUrl: "./strategies.page.html",
  styleUrls: ["./strategies.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrategiesPage implements OnInit, OnDestroy {
  private subDataTransfer: Subscription;

  public strategies: Strategy[];

  constructor(
    private readonly modalService: BsModalService,
    private readonly dataTransferService: DataTransferService<Strategy>,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
    this.createStrategies();
  }

  private initSubscriptions(): void {
    this.subDataTransfer = this.dataTransferService
      .getObservable()
      .pipe(filter((res) => !!res))
      .subscribe((res: DataTransfer<Strategy>) => this.onStrategyTransfer(res));
  }

  private createStrategies(): void {
    this.strategies = [];
  }

  public onStrategyTouched(index: number): void {
    const selectedStrategy = this.strategies[index];
    this.dataTransferService.setSelectedDataModal({
      index: index,
      data: selectedStrategy,
      action: DataTransferAction.EDIT,
    });
    this.modalService.show(EditStrategyModal);
  }

  public createStrategy(): void {
    if (!this.strategies) this.strategies = [];

    this.dataTransferService.setSelectedDataModal({
      index: this.strategies.length,
      data: undefined,
      action: DataTransferAction.ADD,
    });
    this.modalService.show(EditStrategyModal);
  }

  private onStrategyTransfer(res: DataTransfer<Strategy>): void {
    console.log(res);
    if (!this.strategies) this.strategies = [];
    if (res.action === DataTransferAction.DEL) {
      this.removeStrategy(res.index);
      this.cdr.detectChanges();
    }
    if (res.action === DataTransferAction.SAVE) {
      this.strategies[res?.index] = res?.data;
      this.cdr.detectChanges();
    }
  }

  public removeStrategy(index: number): void {
    this.strategies.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.dataTransferService.clear();
    this.subDataTransfer.unsubscribe();
  }
}
