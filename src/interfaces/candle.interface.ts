import { Operation } from "src/enum/operation.enum";

export interface Candle {
  id?: number;

  timestamp: Date;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;

  operation: Operation;
}
