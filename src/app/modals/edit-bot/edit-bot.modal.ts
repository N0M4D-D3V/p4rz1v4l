import { Component, OnInit } from "@angular/core";
import { ExchangeService } from "@services/exchange/exchange.service";
import { BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-edit-bot",
  templateUrl: "./edit-bot.modal.html",
  styleUrls: ["./edit-bot.modal.scss"],
})
export class EditBotModal implements OnInit {
  public exchangeList: string[] = [];

  constructor(
    private readonly modalService: BsModalService,
    private readonly exchangeService: ExchangeService
  ) {}

  ngOnInit(): void {
    this.exchangeList = this.exchangeService.getExchanges();
  }

  public onDismiss(): void {
    this.modalService.hide();
  }
}
