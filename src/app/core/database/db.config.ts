import { Candle } from "@interfaces/candle";

export type DbStructureType = { [tableName: string]: string };

export const DB_NAME: string = "ng-dexie-db";
export const DB_STRUCTURE: DbStructureType = {
  backtestingDatasets: "++id",
  user: "++id",
};

export interface BacktestingDataset {
  id?: number;

  exchange: string;
  market: string;
  timeframe: string;
  limit: number;
  from: string;
  to: string;
  candles: Candle[];
}
