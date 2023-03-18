import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class IndicatorFactory {
  constructor() {}

  getKeysBySymbol(symbol: string): string[] {
    switch (symbol.toLowerCase()) {
      case "rsi":
        return ["period"];
      case "sma":
        return ["period"];
      case "kd":
        return ["period", "SMA period"];
      default:
        alert("Indicator not implemented yet!");
        return [];
    }
  }
}
