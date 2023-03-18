import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ExchangeService {
  private readonly availableExchanges: string[] = ["binance"];

  constructor() {}

  public getExchanges(): string[] {
    return ccxt.exchanges.filter(
      (key: string) =>
        this.availableExchanges.findIndex(
          (a: string) => a.toLocaleLowerCase() === key.toLocaleLowerCase()
        ) !== -1
    );
  }
}
