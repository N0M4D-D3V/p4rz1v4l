import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ExchangeService {
  constructor() {}

  public getExchanges(): string[] {
    return ccxt.exchanges;
  }
}
