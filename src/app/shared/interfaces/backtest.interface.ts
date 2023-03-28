export interface BacktesterConfig {
  initialBalance: number;
  leverage: number; //apalancamiento
  trailingStoploss: boolean;
  feeCostPercentage: number;
}

export interface BacktestResult {
  symbol: string;
  startDate: Date;
  endDate: Date;

  balance: number;
  profit: number;
  drawdown: number;
  profitAfterFees: number;

  totalOps: number;
  longOps: number;
  shortOps: number;
  winnerOps: number;
  losserOps: number;

  winrate: number;
  fitnessFunction: number;
}

export enum OperationType {
  Buy = "buy",
  Sell = "sell",
  Long = "long",
  Short = "short",
  Stoploss = "stoploss",
  LongOpen = "long_open",
  ShortOpen = "short_open",

  LongClose = "long_close",
  ShortClose = "short_close",
  LongStopLossClose = "long_stoploss_close",
  ShortStopLossClose = "short_stoploss_close",
}
