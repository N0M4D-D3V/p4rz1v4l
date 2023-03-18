export interface IndicatorInfo {
  name: string;
  symbol?: string;
  indicator?: Indicator;
}

export interface Indicator {
  nextValue(fparam?: any, sparam?: any, tparam?: any): any;
  momentValue(fparam?: any, sparam?: any, tparam?: any): any;
}
