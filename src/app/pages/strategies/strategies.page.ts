import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { EditStrategyModal } from "@modals/edit-strategy/edit-strategy.modal";
import { BsModalService } from "ngx-bootstrap/modal";
import { Strategy } from "@interfaces/strategies.interface";
import { filter } from "rxjs/operators";
import { StrategyService } from "@services/strategy/strategy.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-strategies",
  templateUrl: "./strategies.page.html",
  styleUrls: ["./strategies.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrategiesPage implements OnInit {
  public strategies$: Observable<Strategy[]>;

  constructor(
    private readonly modalService: BsModalService,
    private readonly strategyService: StrategyService
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  private initSubscriptions(): void {
    this.strategies$ = this.strategyService
      .getObservable()
      .pipe(filter((res: Strategy[]) => !!res));
  }

  public onStrategyTouched(strat: Strategy): void {
    this.strategyService.selectedStrategy = strat;
    this.modalService.show(EditStrategyModal);
  }

  public createStrategy(): void {
    this.strategyService.clearSelectedStrategy();
    this.modalService.show(EditStrategyModal);
  }
}
