import { Candle } from "@interfaces/candle";
import { OHLCV } from "ccxt";

export class ExchangeResponseInterpreter {
  constructor() {}

  public createDataframe(ohlcvList: OHLCV[]): Candle[] {
    return ohlcvList.map((ohlcv: OHLCV) => this.createDataframeItem(ohlcv));
  }

  public createDataframeItem(ohlcv: OHLCV): Candle {
    return {
      timestamp: new Date(ohlcv[0]),
      open: ohlcv[1],
      high: ohlcv[2],
      low: ohlcv[3],
      close: ohlcv[4],
      volume: ohlcv[5],
    };
  }
}
