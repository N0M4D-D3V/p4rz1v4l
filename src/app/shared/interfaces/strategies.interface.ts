import { IndicatorInfo } from "./indicator.interface";
export interface Strategy {
  id: number;
  name: string;
  stoploss: number;
  takeprofit: number;
  indicators: IndicatorInfo[];
}
