import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ExchangeFactoryService } from "@services/exchange/exchange-factory.service";
import { ExchangeService } from "@services/exchange/exchange.service";
import { Exchange } from "ccxt";
import { BsModalService } from "ngx-bootstrap/modal";
import { DataModalSelectionService } from "@services/modals/data-modals";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-bot",
  templateUrl: "./edit-bot.modal.html",
  styleUrls: ["./edit-bot.modal.scss"],
})
export class EditBotModal implements OnInit {
  private exchange: Exchange;
  private selectedBotSub: Subscription;

  public exchangeList: string[] = [];
  public marketList: string[] = [];

  public form: FormGroup;
  public selectedBot: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly modalService: BsModalService,
    private readonly exchangeFactoryService: ExchangeFactoryService,
    private readonly exchangeService: ExchangeService,
    private readonly dataSelectionService: DataModalSelectionService
  ) {}

  ngOnInit(): void {
    this.getDataModal();
    this.exchangeList = this.exchangeService.getExchanges();
    this.createForm();
    this.onSubForm();
  }

  private getDataModal() {
    this.selectedBotSub =
      this.dataSelectionService.selectedDataModal$.subscribe((bot) => {
        this.selectedBot = bot;
      });
  }

  public onDismiss(): void {
    this.selectedBotSub.unsubscribe();
    this.modalService.hide();
  }

  public createForm(): void {
    this.form = this.formBuilder.group({
      exchange: [""],
      market: [{ value: "", disabled: true }],
      strategy: [""],
    });
  }

  private async onSubForm(): Promise<void> {
    this.form.valueChanges.subscribe(async (data) => {
      if (data.exchange) {
        this.exchange = this.exchangeFactoryService.getInstance(data.exchange);
        await this.exchange.loadMarkets();
        this.marketList = this.exchange.symbols;
        this.enableFormField("market");
      }
    });
  }

  private enableFormField(key: string): void {
    this.form.controls[key].enable();
  }
}
