export interface IndicatorInfo {
  name: string;
  symbol?: string;
  operationType?: "buy" | "sell";
  config?: IndicatorOption[];
}

export interface Indicator {
  nextValue(fparam?: any, sparam?: any, tparam?: any): any;
  momentValue(fparam?: any, sparam?: any, tparam?: any): any;
}

export interface IndicatorOption {
  variable: string;
  value: number;
}
