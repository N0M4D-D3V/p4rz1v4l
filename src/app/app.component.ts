import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor() {}

  async ngOnInit(): Promise<void> {
    const exchange = new ccxt.binance();
    const markets = await exchange.loadMarkets();

    console.log(exchange.id, markets);
  }
}
