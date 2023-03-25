import { IndicatorInfo } from "@interfaces/indicator.interface";
import { Candle } from "@interfaces/candle";

export class Strategy {
  id: number;
  name: string;
  stoploss: number;
  takeprofit: number;
  indicators: IndicatorInfo[];

  public constructor(
    id: number,
    name: string,
    stoploss: number,
    takeprofit: number,
    indicators: IndicatorInfo[]
  ) {
    this.id = id;
    this.name = name;
    this.stoploss = stoploss;
    this.takeprofit = takeprofit;
    this.indicators = indicators;
  }

  /**
   * Prepare the strategy. Sets the params in pre-executing sentences.
   *
   * @param dataframe
   */
  public set_up(dataframe: Candle[]): void {
    console.error("not implemented method");
  }

  /**
   * Checks if long signal is OK.
   *
   * @param i
   */
  public check_long_signal(i: number): boolean {
    console.error("not implemented method");
    return true;
  }

  /**
   * Checks if short signal is OK.
   *
   * @param i
   */
  public check_short_signal(i: number): boolean {
    console.error("not implemented method");
    return true;
  }
}
