import { Component, OnInit } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-edit-strategy",
  templateUrl: "./edit-strategy.modal.html",
  styleUrls: ["./edit-strategy.modal.scss"],
})
export class EditStrategyModal implements OnInit {
  constructor(private readonly modalService: BsModalService) {}

  ngOnInit(): void {}

  public onDismiss(): void {
    this.modalService.hide();
  }
}
