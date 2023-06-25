import { Ticker } from "ccxt";
import { Operation } from "src/enum/operation.enum";
import { Candle } from "src/interfaces/candle.interface";

export function isCloseTo(
  value: number,
  target: number,
  threshord: number
): boolean {
  const difference: number = Math.abs(value - target);
  return difference <= threshord;
}

export function tickerToCandle(ticker: Ticker): Candle {
  return {
    open: ticker?.open,
    close: ticker?.close,
    high: ticker?.high,
    low: ticker?.low,
    volume: ticker?.baseVolume,
    operation: Operation.None,
    timestamp: new Date(ticker?.timestamp),
  };
}
