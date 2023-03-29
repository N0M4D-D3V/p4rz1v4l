import { OperationType } from "@interfaces/backtest.interface";
import { IndicatorOption } from "@interfaces/indicator.interface";
import { AbstractIndicator } from "@models/abstract/abstract-indicator.model";
import { IndicatorInfo } from "@interfaces/indicator.interface";
import { RSI } from "@debut/indicators";
import { Candle } from "@interfaces/candle";

export class RSIIndicator extends AbstractIndicator {
  private period: number = 30;
  private oversold: number = 30;
  private overbought: number = 70;

  private rsi: RSI;

  constructor(ind: IndicatorInfo) {
    super();
    this.name = ind.name;
    this.symbol = ind.symbol;
    this.provisionalID = ind.provisionalID;
    this.operationType = ind.operationType;
    this.config = ind.config;

    this.config.forEach(
      (option: IndicatorOption) => (this[option.variable] = option.value)
    );

    this.rsi = new RSI(this.period);
  }

  public checkLongSignal(candle: Candle): boolean {
    if (this.isShortMode()) return false;

    const momentValue: number = this.rsi.momentValue(candle.close);
    let result: boolean = false;

    if (momentValue <= this.oversold) result = true;
    this.rsi.nextValue(candle.close);

    return result;
  }

  public checkShortSignal(candle: Candle): boolean {
    if (this.isLongMode()) return false;

    const rsiValue = this.rsi.nextValue(candle.close);
    let result: boolean = false;

    if (rsiValue >= this.overbought) result = true;
    this.rsi.nextValue(candle.close);

    return result;
  }
}
