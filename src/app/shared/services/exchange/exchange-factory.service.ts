import { Injectable } from "@angular/core";
import { ExchangeKey } from "@custom-types/market.types";
import { Exchange } from "ccxt";

Injectable({ providedIn: "root" });
export class ExchangeFactoryService {
  constructor() {}

  public getInstance(key: ExchangeKey): Exchange {
    switch (key.toLocaleLowerCase()) {
      case "binance":
        return new ccxt.binance();

      default:
        throw new Error(`Exchange '${key}' not available`);
    }
  }
}
