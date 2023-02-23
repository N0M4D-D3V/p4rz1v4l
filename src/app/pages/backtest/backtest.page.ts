import { Component } from "@angular/core";
import { EditStrategyModal } from "@modals/edit-strategy/edit-strategy.modal";
import { BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-backtest",
  templateUrl: "./backtest.page.html",
  styleUrls: ["./backtest.page.scss"],
})
export class BacktestPage {
  constructor(private readonly modalService: BsModalService) {}

  public onEdit(): void {
    this.modalService.show(EditStrategyModal);
  }
}
