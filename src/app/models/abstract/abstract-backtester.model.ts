import { AbstractStrategy } from "./abstract-estrategy.model";

abstract class AbstractBacktester {
  // Executes the test process
  public abstract backtesting(dataframe: any, strategy: AbstractStrategy): void;

  // Opens a long/short position
  public abstract open_position(
    price: number,
    side: string,
    stoploss_from_open: number
  ): void;

  // Closes a long/short position
  public abstract close_position(price: number): void;

  // Sets take profit value
  public abstract set_take_profit(
    price: number,
    take_profit_long: number,
    take_profit_short: number
  ): void;

  // Set the stop loss value
  public abstract set_stop_loss(
    price: number,
    take_profit_long: number,
    take_profit_short: number
  ): void;

  // Formats and returns the results
  public abstract return_results(
    symbol: string,
    start_date: string,
    end_date: string
  ): void;

  // Reset result values 4 a new test
  public abstract reset_results(): void;
}
