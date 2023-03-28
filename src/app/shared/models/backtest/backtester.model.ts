import {
  BacktesterConfig,
  BacktestResult,
  OperationType,
} from "@interfaces/backtest.interface";
import { BacktestCandle, Candle } from "@interfaces/candle";
import { Strategy } from "../strategy/estrategy.model";

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
    tpLongMultiplicator: number = 1.03,
    tpShortMultiplicator: number = 0.97
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
    slLongMultiplicator: number = 0.99,
    slShortMultiplicator: number = 1.01
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
  public async execute(
    dataframe: Candle[],
    strategy: Strategy
  ): Promise<BacktestCandle[]> {
    return dataframe.map((candle: Candle, index: number) => {
      const btCandle: BacktestCandle = {
        ...candle,
        operation: null,
        operationPrice: null,
      };

      if (this.balance > 0) {
        if (strategy.checkLongSignals(candle)) {
          btCandle.operation = OperationType.LongOpen;
          btCandle.operationPrice = candle.close;
          this.openPosition(candle.close, OperationType.Long, index);
          this.setTakeProfit(candle.close);
          this.setStoploss(candle.close);
        } else if (strategy.checkShortSignals(candle)) {
          btCandle.operation = OperationType.ShortOpen;
          btCandle.operationPrice = candle.close;
          this.openPosition(candle.close, OperationType.Short, index);
          this.setTakeProfit(candle.close);
          this.setStoploss(candle.close);
        } else {
          if (this.trailingStoploss && (this.isLongOpen || this.isShortOpen)) {
            const highPrices: number[] = dataframe
              .slice(this.fromOpened, index)
              .map((candle: Candle) => candle.high);
            const newMax = Math.max(...highPrices);
            const previousStopLoss = this.stoplossPrice;

            this.setStoploss(newMax);
            if (previousStopLoss > this.stoplossPrice)
              this.stoplossPrice = previousStopLoss;
          }

          if (this.isLongOpen) {
            if (candle.high >= this.takeProfitPrice) {
              btCandle.operation = OperationType.LongClose;
              btCandle.operationPrice = this.takeProfitPrice;
              this.closePosition(this.takeProfitPrice);
            } else if (candle.low <= this.stoplossPrice) {
              btCandle.operation = OperationType.LongStopLossClose;
              btCandle.operationPrice = this.stoplossPrice;
              this.closePosition(this.stoplossPrice);
            }
          } else if (this.isShortOpen) {
            if (candle.high >= this.stoplossPrice) {
              btCandle.operation = OperationType.ShortStopLossClose;
              btCandle.operationPrice = this.stoplossPrice;
              this.closePosition(this.stoplossPrice);
            } else if (candle.low <= this.takeProfitPrice) {
              btCandle.operation = OperationType.ShortClose;
              btCandle.operationPrice = this.takeProfitPrice;
              this.closePosition(this.takeProfitPrice);
            }
          }
        }
      }
      return btCandle;
    });
  }
}
