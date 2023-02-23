import { Component, OnInit } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-edit-bot",
  templateUrl: "./edit-bot.modal.html",
  styleUrls: ["./edit-bot.modal.scss"],
})
export class EditBotModal implements OnInit {
  constructor(private readonly modalService: BsModalService) {}

  ngOnInit(): void {}

  public onDismiss(): void {
    this.modalService.hide();
  }
}
