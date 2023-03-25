import { Component } from "@angular/core";
import { EditStrategyModalComponent } from "@modals/edit-strategy/edit-strategy.modal";
import { BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-genetic-algorithms",
  templateUrl: "./genetic-algorithms.page.html",
  styleUrls: ["./genetic-algorithms.page.scss"],
})
export class GeneticAlgorithmsPage {
  constructor(private readonly modalService: BsModalService) {}

  public onEdit(): void {
    this.modalService.show(EditStrategyModalComponent);
  }
}
