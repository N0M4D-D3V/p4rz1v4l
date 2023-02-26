import { Injectable } from "@angular/core";
import { Exchange } from "ccxt";

Injectable({ providedIn: "root" });
export class ExchangeFactoryService {
  constructor() {}

  public getInstance(key: string): Exchange {
    switch (key.toLocaleLowerCase()) {
      case "binance":
        return new ccxt.binance();

      default:
        throw new Error(`Exchange '${key}' not available`);
    }
  }
}
