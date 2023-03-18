export interface IndicatorInfo {
  name: string;
  symbol?: string;
  indicator?: Indicator;
}

export interface Indicator {
  nextValue(value: number): number;
  momentValue(value: number): number;
}
