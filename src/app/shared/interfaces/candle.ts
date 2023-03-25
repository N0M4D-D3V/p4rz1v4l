import { OperationType } from "./backtest.interface";

export interface Candle {
  timestamp: Date;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

export interface BacktestCandle extends Candle {
  operation?: OperationType;
  operationPrice?: number;
}
