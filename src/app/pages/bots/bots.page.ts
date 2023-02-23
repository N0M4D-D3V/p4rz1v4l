import { Component } from "@angular/core";
import { EditBotModal } from "@modals/edit-bot/edit-bot.modal";
import { BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-bots",
  templateUrl: "./bots.page.html",
  styleUrls: ["./bots.page.scss"],
})
export class BotsPage {
  public bots: string[] = [
    "bot 1",
    "bot 2",
    "bot 3",
    "bot 4",
    "bot 5",
    "bot 6",
    "bot 7",
  ];

  constructor(private readonly modalService: BsModalService) {}

  public onBotTouched(): void {
    this.modalService.show(EditBotModal);
  }
}
