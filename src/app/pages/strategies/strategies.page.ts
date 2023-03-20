import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { EditStrategyModal } from "@modals/edit-strategy/edit-strategy.modal";
import { BsModalService } from "ngx-bootstrap/modal";
import { Strategy } from "@interfaces/strategies.interface";
import { DataTransferService } from "@services/modals/data-transfer.service";
import { Subscription } from "rxjs";
import {
  DataTransfer,
  DataTransferAction,
} from "@interfaces/data-transfer.interface";
import { filter } from "rxjs/operators";
import { StrategyService } from "@services/strategy/strategy.service";

@Component({
  selector: "app-strategies",
  templateUrl: "./strategies.page.html",
  styleUrls: ["./strategies.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrategiesPage implements OnInit, OnDestroy {
  private subStrategy: Subscription;
  private subDataTransfer: Subscription;

  public strategies: Strategy[];

  constructor(
    private readonly modalService: BsModalService,
    private readonly dataTransferService: DataTransferService<Strategy>,
    private readonly strategyService: StrategyService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  private initSubscriptions(): void {
    this.subStrategy = this.strategyService
      .getObservable()
      .pipe(filter((res: Strategy[]) => !!res))
      .subscribe((res: Strategy[]) => (this.strategies = res));

    this.subDataTransfer = this.dataTransferService
      .getObservable()
      .pipe(filter((res) => !!res))
      .subscribe((res: DataTransfer<Strategy>) => this.onStrategyTransfer(res));
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
    if (!this.strategies) this.strategies = [];
    if (res.action === DataTransferAction.DEL) {
      this.removeStrategy(res.index);
      this.cdr.detectChanges();
    }
    if (res.action === DataTransferAction.SAVE) {
      this.strategyService.updateAtIndex(res?.index, res?.data);
      this.cdr.detectChanges();
    }
  }

  public removeStrategy(index: number): void {
    this.strategies.splice(index, 1);
    this.strategyService.deleteAtIndex(index);
  }

  ngOnDestroy(): void {
    this.dataTransferService.clear();
    this.subDataTransfer.unsubscribe();
    this.subStrategy.unsubscribe();
  }
}
