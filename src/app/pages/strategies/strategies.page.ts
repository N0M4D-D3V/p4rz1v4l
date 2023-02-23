import { Component } from "@angular/core";
import { EditStrategyModal } from "@modals/edit-strategy/edit-strategy.modal";
import { BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-strategies",
  templateUrl: "./strategies.page.html",
  styleUrls: ["./strategies.page.scss"],
})
export class StrategiesPage {
  public strategies: string[] = [
    "strat 1",
    "strat 2",
    "strat 3",
    "strat 4",
    "strat 5",
    "strat 6",
    "strat 7",
  ];

  constructor(private readonly modalService: BsModalService) {}

  public onStrategyTouched(): void {
    this.modalService.show(EditStrategyModal);
  }
}
