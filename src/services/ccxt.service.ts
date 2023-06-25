import { Injectable } from "@nestjs/common";
import ccxt, { Balances, Exchange, OHLCV, Order, Ticker, binance } from "ccxt";
import { ExchangeResponseInterpreter } from "./exchange-response-interpreter.service";

import * as CONFIG from "src/config/config.json";
import { Cron } from "@nestjs/schedule";
import { AccountService } from "./account.service";
import { GridOperationsService } from "./grid-operations.service";
import { Operation } from "../enum/operation.enum";
import { Candle } from "src/interfaces/candle.interface";
import { tickerToCandle } from "src/common/functions";
import { CandleService } from "src/controllers/candles/candle.service";

@Injectable()
export class CcxtService {
  private exchange: Exchange = new binance({
    apiKey: CONFIG.api,
    secret: CONFIG.secret,
  });

  constructor(
    private readonly accountService: AccountService,
    private readonly interpreter: ExchangeResponseInterpreter,
    private readonly gridOperationsService: GridOperationsService,
    private readonly candleService: CandleService
  ) {}

  @Cron(CONFIG.cron.check_price)
  public async getPrice(): Promise<number> {
    const symbol: string = CONFIG.market;

    try {
      // Load the exchange's markets
      await this.exchange.loadMarkets();

      // Fetch the ticker data for the specified symbol
      const ticker: Ticker = await this.exchange.fetchTicker(symbol);
      const candle: Candle = tickerToCandle(ticker);
      const operation: Operation = this.gridOperationsService.getOperation(
        ticker.last
      );

      console.log("");
      console.log("<>-----<" + symbol + ">-----<>");

      candle.operation = operation;
      if (operation === Operation.Buy) {
        console.log("buy at price: ", ticker.last);
        this.buy(ticker.last);
      }

      if (operation === Operation.Sell) {
        console.log("sell at price: ", ticker.last);
        this.sell(ticker.last);
      }

      if (operation === Operation.None) {
        console.log("No operation at price: ", ticker.last);
      }

      console.log("Balance: ", this.accountService.balance);
      await this.candleService.create(candle);

      // Return the current price
      return ticker.last;
    } catch (error) {
      // Handle any errors that occur
      console.error("Error fetching current price:", error);
      throw error;
    }
  }

  public async buy(currentPrice: number): Promise<void> {
    this.exchange.setSandboxMode(true);

    const budget: number = this.accountService.buyBudget();
    const amount: number = budget / currentPrice;

    console.log("");
    console.log("buying at ", currentPrice);
    console.log("budget: ", budget);
    console.log("amount: ", amount);
    console.log("");

    this.accountService.balance -= budget;

    // await this.exchange
    //   .createOrder(CONFIG.market, "market", "buy", amount)
    //   .then((value: Order) => {
    //     value.status;
    //   });
  }

  public async sell(currentPrice: number): Promise<void> {
    this.exchange.setSandboxMode(true);

    const budget: number = this.accountService.buyBudget();
    const amount: number = budget / currentPrice;

    console.log("");
    console.log("selling at ", currentPrice);
    console.log("budget: ", budget);
    console.log("amount: ", amount);
    console.log("");

    this.accountService.balance += budget;

    // await this.exchange
    //   .createOrder(CONFIG.market, "market", "sell", amount)
    //   .then((value: Order) => {
    //     value.status;
    //   });
  }

  // public async getAll(query: Query): Promise<Candle[]> {
  //   const ohlcv: OHLCV[] = await this.exchange.fetchOHLCV(
  //     query.symbol,
  //     query?.timeframe,
  //     query?.since,
  //     query?.limit,
  //     query?.params
  //   );

  //   const candles: Candle[] = this.interpreter.createDataframe(ohlcv);
  //   return candles;
  // }

  // public async getBetween(
  //   query: Query,
  //   startdate: string,
  //   enddate: string
  // ): Promise<Candle[]> {
  //   const start: number = moment(`${startdate}T00:00:00Z`).valueOf();
  //   const end: number = moment(`${enddate}T00:00:00Z`).valueOf();
  //   const ohlcv: OHLCV[] = [];

  //   let since = start;
  //   while (since < end) {
  //     try {
  //       const data: OHLCV[] = await this.exchange.fetchOHLCV(
  //         query.symbol,
  //         query?.timeframe,
  //         since,
  //         query?.limit,
  //         query?.params
  //       );
  //       if (data.length) {
  //         since = data[data.length - 1][0] + 1;
  //         ohlcv.push(...data);
  //       } else {
  //         break;
  //       }
  //     } catch (err) {
  //       console.error(
  //         `Failed to fetch data between ${moment(since).utc()} and ${moment(
  //           end
  //         ).utc()}: ${err}`
  //       );
  //       break;
  //     }
  //   }

  //   const interpreter: ExchangeResponseInterpreter =
  //     new ExchangeResponseInterpreter();
  //   const candles: Candle[] = interpreter.createDataframe(ohlcv);

  //   return candles;
  // }

  // public async getBalance(): Promise<Balances> {
  //   try {
  //     await this.exchange.loadMarkets();
  //     const balances = await this.exchange.fetchBalance();

  //     return balances;
  //   } catch (error) {
  //     console.error("Error fetching account balance:", error);
  //     throw error;
  //   }
  // }
}
