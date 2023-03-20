import { AbstractStrategy } from "../abstract/abstract-estrategy.model";

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
  Long,
  Short,
  Stoploss,
}

export class Backtester {
  private config: BacktesterConfig;

  private balance: number;

  private leverage: number;
  private feeCost: number;
  private inv: number;
  private trailingStoploss: boolean;

  private totalOperation: number = 0;
  private winnerOperation: number = 0;
  private loserOperation: number = 0;
  private longOperation: number = 0;
  private shortOperation: number = 0;

  private isLongOpen: boolean = false;
  private isShortOpen: boolean = false;

  private amount: number = 0;
  private longOpenPrice: number = 0;
  private shortOpenPrice: number = 0;
  private profit: number[] = [];
  private drawdown: number[] = [];
  private takeProfitPrice: number = 0;
  private stoplossPrice: number = 0;
  private fromOpened: number = 0;

  constructor(config: BacktesterConfig) {
    this.config = config;

    this.balance = config.initialBalance;
    this.leverage = config.leverage;
    this.trailingStoploss = config.trailingStoploss;
    this.feeCost = config.feeCostPercentage / 100;
    this.inv = this.balance * 0.01 * this.leverage;
  }

  public reset(): void {
    this.balance = this.config.initialBalance;
    this.leverage = this.config.leverage;
    this.trailingStoploss = this.config.trailingStoploss;

    this.totalOperation = 0;
    this.winnerOperation = 0;
    this.loserOperation = 0;
    this.longOperation = 0;
    this.shortOperation = 0;

    this.isLongOpen = false;
    this.isShortOpen = false;
    this.fromOpened = 0;
  }

  public openPosition(
    price: number,
    operation: OperationType,
    fromOpened: number = 0
  ): void {
    this.totalOperation++;

    if (operation === OperationType.Long) this.openLong(price);
    if (operation === OperationType.Short) this.openShort(price);

    if (this.trailingStoploss) this.fromOpened = fromOpened;
  }

  private openLong(price: number): void {
    this.longOperation++;

    // if short position is open, then closes the position
    if (this.isShortOpen) {
      this.closePosition(price);
      return;
    }

    // if long position is open, updates prices and amount
    if (this.isLongOpen) {
      this.longOpenPrice = (this.longOpenPrice + price) / 2;
      this.amount += this.inv / price;
      return;
    }

    // if no short/long operation added, then opens a new one.
    this.isLongOpen = true;
    this.longOpenPrice = price;
    this.amount = this.inv / price;
  }

  private openShort(price: number): void {
    this.shortOperation++;

    // if long is open, closes it
    if (this.isLongOpen) {
      this.closePosition(price);
      return;
    }

    // if short is open, updates it
    if (this.isShortOpen) {
      this.shortOpenPrice = (this.shortOpenPrice + price) / 2;
      this.amount += this.inv / price;
      return;
    }

    // if no short/long operation added, then opens a new one.
    this.isShortOpen = true;
    this.shortOpenPrice = price;
    this.amount = this.inv / price;
  }

  /**
   * Close position management.
   *
   * @param price
   */
  public closePosition(price: number): void {
    let result: number = 0;

    // closes long ops
    if (this.isLongOpen) result = this.closeLong(price);

    // closes short ops
    if (this.isShortOpen) result = this.closeShort(price);

    // updates the profit and balance
    this.profit.push(result);
    this.balance += result;

    // evaluates if it was a winner or a loser operation
    if (result > 0) this.addWinnerOperation();
    else this.addLoserOperation(result);

    // resets stoploss and takeprofit
    this.takeProfitPrice = 0;
    this.stoplossPrice = 0;
  }

  /**
   * Adds one winner operation for final results
   */
  private addWinnerOperation(): void {
    this.winnerOperation++;
    this.drawdown.push(0);
  }

  /**
   * Adds one loser operation for final results
   */
  private addLoserOperation(result: number): void {
    this.loserOperation++;
    this.drawdown.push(result);
  }

  /**
   * CLoses a short operation
   *
   * @param price
   */
  private closeShort(price: number): number {
    const result: number = this.amount * (this.shortOpenPrice - price);
    this.isShortOpen = false;
    this.shortOpenPrice = 0;
    return result;
  }

  /**
   * Closes a long operation
   *
   * @param price
   */
  private closeLong(price: number): number {
    const result: number = this.amount * (price - this.longOpenPrice);
    this.isLongOpen = false;
    this.longOpenPrice = 0;
    return result;
  }

  /**
   * Updates the take profit for long/short ops while they are running
   */
  private setTakeProfit(
    price: number,
    tpLongMultiplicator: number = 1.05,
    tpShortMultiplicator: number = 0.95
  ): void {
    if (this.isLongOpen) this.takeProfitPrice = price * tpLongMultiplicator;
    if (this.isShortOpen) this.takeProfitPrice = price * tpShortMultiplicator;
  }

  /**
   * Updates the stoploss for long/short ops while they are running
   * @param price
   * @param slLongMultiplicator
   * @param slShortMultiplicator
   */
  private setStoploss(
    price: number,
    slLongMultiplicator: number = 0.98,
    slShortMultiplicator: number = 1.02
  ): void {
    if (this.isLongOpen) this.stoplossPrice = price * slLongMultiplicator;
    if (this.isShortOpen) this.stoplossPrice = price * slShortMultiplicator;
  }

  /**
   * Returns the results of the backtest
   */
  public getResults(symbol: string, startDate: Date, endDate: Date): any {
    const profit: number = this.profit.reduce((a, b) => a + b, 0);
    const drawdown: number = this.drawdown.reduce((a, b) => a + b, 0);
    const fees: number = Math.abs(profit) * this.feeCost * this.totalOperation;
    const profitAfterFees: number = profit - fees;

    const results: BacktestResult = {
      symbol: symbol,
      startDate: startDate,
      endDate: endDate,
      balance: this.balance,
      profit: profit,
      drawdown: drawdown,
      profitAfterFees: profitAfterFees,
      totalOps: this.totalOperation,
      longOps: this.longOperation,
      shortOps: this.shortOperation,
      winnerOps: this.winnerOperation,
      losserOps: this.loserOperation,
      winrate: 0,
      fitnessFunction: 0,
    };

    if (
      this.totalOperation > 0 &&
      this.winnerOperation + this.loserOperation > 0
    ) {
      const winrate: number = this.calcWinrate();
      const fitnessFunction: number = this.calcFitness(
        profit,
        drawdown,
        winrate
      );
      results["winrate"] = winrate;
      results["fitnessFunction"] = fitnessFunction;
    }
    return results;
  }

  private calcWinrate(): number {
    return this.winnerOperation / (this.winnerOperation + this.loserOperation);
  }

  private calcFitness(
    profit: number,
    drawdown: number,
    winrate: number
  ): number {
    return (
      ((this.longOperation + this.shortOperation) *
        (profit - Math.abs(drawdown)) *
        winrate) /
      this.totalOperation
    );
  }

  /**
   * Executes 'TH3 B4CKT3ST!' >:v
   *
   * @param dataframe
   * @param strategy
   */
  public execute(dataframe: any, strategy: AbstractStrategy): any {
    // df['operation'] = ""
    // df['operation_price'] = ""
    // high_price = df['high_price']
    // close_price = df['close_price']
    // low_price = df['low_price']
    // operations = df['operation']
    // operation_prices = df['operation_price']
    // for i in range(len(df)):
    //     if self.balance > 0:
    //         if strategy.check_long_signal(i):
    //             operations[i] = OperationType.LONG_OPEN
    //             operation_prices[i] = close_price[i]
    //             self.open_position(price=close_price[i], side=OperationType.LONG, from_opened=i)
    //             self.set_take_profit(price=close_price[i], tp_long=1.03)
    //             self.set_stop_loss(price=close_price[i], sl_long=0.99)
    //         elif strategy.check_short_signal(i):
    //             operations[i] = OperationType.SHORT_OPEN
    //             operation_prices[i] = close_price[i]
    //             self.open_position(price=close_price[i], side=OperationType.SHORT, from_opened=i)
    //             self.set_take_profit(price=close_price[i], tp_short=0.97)
    //             self.set_stop_loss(price=close_price[i], sl_short=1.01)
    //         else:
    //             if self.trailing_stop_loss and (self.is_long_open or self.is_short_open):
    //                 new_max = high_price[self.from_opened:i].max()
    //                 previous_stop_loss = self.stop_loss_price
    //                 self.set_stop_loss(price=new_max)
    //                 if previous_stop_loss > self.stop_loss_price:
    //                     self.stop_loss_price = previous_stop_loss
    //             if self.is_long_open:
    //                 if high_price[i] >= self.take_profit_price:
    //                     operations[i] = OperationType.LONG_CLOSE
    //                     operation_prices[i] = self.take_profit_price
    //                     self.close_position(price=self.take_profit_price)
    //                 elif low_price[i] <= self.stop_loss_price:
    //                     operations[i] = OperationType.LONG_STOPLOSS_CLOSE
    //                     operation_prices[i] = self.stop_loss_price
    //                     self.close_position(price=self.stop_loss_price)
    //             elif self.is_short_open:
    //                 if high_price[i] >= self.stop_loss_price:
    //                     operations[i] = OperationType.SHORT_STOPLOSS_CLOSE
    //                     operation_prices[i] = self.stop_loss_price
    //                     self.close_position(price=self.stop_loss_price)
    //                 elif low_price[i] <= self.take_profit_price:
    //                     operations[i] = OperationType.SHORT_CLOSE
    //                     operation_prices[i] = self.take_profit_price
    //                     self.close_position(price=self.take_profit_price)
    // return df
  }
}
