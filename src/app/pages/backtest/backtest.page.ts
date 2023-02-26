import { Component, OnInit } from "@angular/core";
import { EditStrategyModal } from "@modals/edit-strategy/edit-strategy.modal";
import { ExchangeService } from "@services/exchange/exchange.service";
import { BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-backtest",
  templateUrl: "./backtest.page.html",
  styleUrls: ["./backtest.page.scss"],
})
export class BacktestPage implements OnInit {
  public exchangeList: string[] = [];

  constructor(
    private readonly modalService: BsModalService,
    private readonly exchangeService: ExchangeService
  ) {}

  ngOnInit(): void {
    this.exchangeList = this.exchangeService.getExchanges();
  }

  public onEdit(): void {
    this.modalService.show(EditStrategyModal);
  }
}
