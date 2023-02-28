import { Component, OnInit } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { DataModalSelectionService } from "@services/modals/data-modals";
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

  public onDelete(): void {
    alert("DELETE");
  }

  public onEdit(label: string): void {
    alert("EDIT " + label);
  }
}
