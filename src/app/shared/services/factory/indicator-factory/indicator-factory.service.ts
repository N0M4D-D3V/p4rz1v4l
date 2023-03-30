import { Injectable } from "@angular/core";
import { IndicatorInfo } from "@interfaces/indicator.interface";
import { AbstractIndicator } from "@models/abstract/abstract-indicator.model";
import { RSIIndicator } from "@models/indicator/rsi-indicator.model";
import { MACDIndicator } from "../../../models/indicator/macd-indicator.model";

@Injectable({ providedIn: "root" })
export class IndicatorFactory {
  constructor() {}

  getInstance(ind: IndicatorInfo): AbstractIndicator {
    switch (ind.symbol.toLowerCase()) {
      case "rsi":
        return new RSIIndicator(ind);
      case "macd":
        return new MACDIndicator(ind);
      default:
        return undefined;
    }
  }

  getKeysBySymbol(symbol: string): string[] {
    switch (symbol.toLowerCase()) {
      case "rsi":
        return ["period", "overbought", "oversold"];
      case "macd":
        return ["periodEmaFast", "periodEmaSlow", "periodSignal"];
      default:
        alert("Indicator not implemented yet!");
        return [];
    }
  }
}
