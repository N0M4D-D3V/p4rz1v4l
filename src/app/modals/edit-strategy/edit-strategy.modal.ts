import { Component, OnInit } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { StrategySelectionService } from "@services/modals/strategies-modals";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-strategy",
  templateUrl: "./edit-strategy.modal.html",
  styleUrls: ["./edit-strategy.modal.scss"],
})
export class EditStrategyModal implements OnInit {
  public selectedStrategy: any;
  private selectedStrategySub: Subscription;

  constructor(
    private readonly modalService: BsModalService,
    private readonly strategySelectionService: StrategySelectionService
  ) {}

  ngOnInit(): void {
    this.selectedStrategySub = this.strategySelectionService.selectedStrategy$.subscribe(
      (strategy) => {
        this.selectedStrategy = strategy;
      }
    );
  }

  public onDismiss(): void {
     this.selectedStrategySub.unsubscribe();
    this.modalService.hide();
  }
}
