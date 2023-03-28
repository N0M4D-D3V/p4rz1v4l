import { IndicatorInfo } from "@interfaces/indicator.interface";
import { Candle } from "@interfaces/candle";
import { AbstractIndicator } from "@models/abstract/abstract-indicator.model";
import { IndicatorFactory } from "@services/factory/indicator-factory/indicator-factory.service";

export class Strategy {
  id: number;
  name: string;
  stoploss: number;
  takeprofit: number;
  indicators: AbstractIndicator[];

  public constructor(
    id: number,
    name: string,
    stoploss: number,
    takeprofit: number,
    indicators: IndicatorInfo[]
  ) {
    const indicatorFactory: IndicatorFactory = new IndicatorFactory();

    this.id = id;
    this.name = name;
    this.stoploss = stoploss;
    this.takeprofit = takeprofit;

    this.indicators = [];
    indicators.forEach((ind) =>
      this.indicators.push(indicatorFactory.getInstance(ind))
    );
  }

  /**
   * Checks if long signal is OK.
   *
   * @param i
   */
  public checkLongSignals(candle: Candle): boolean {
    let result: boolean;

    for (let ind of this.indicators) {
      result = ind.checkLongSignal(candle);
      if (!result) break;
    }

    return result;
  }

  /**
   * Checks if short signal is OK.
   *
   * @param i
   */
  public checkShortSignals(candle: Candle): boolean {
    let result: boolean;

    for (let ind of this.indicators) {
      result = ind.checkShortSignal(candle);
      if (!result) break;
    }

    return result;
  }
}
