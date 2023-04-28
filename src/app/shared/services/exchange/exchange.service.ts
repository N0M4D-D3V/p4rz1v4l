import { Injectable } from "@angular/core";
import { Exchange, OHLCV, Params } from "ccxt";
import { Candle } from "@interfaces/candle";
import { ExchangeResponseInterpreter } from "@models/exchange/ExchangeResponseInterpreter";
import moment from "moment";

export interface Query {
  symbol: string;
  timeframe?: string;
  since?: number;
  limit?: number;
  params?: Params;
}

@Injectable({ providedIn: "root" })
export class ExchangeService {
  private exchange: Exchange;

  constructor() {}

  public setExchange(exchange: Exchange): void {
    this.exchange = exchange;
  }

  public async getAll(query: Query): Promise<Candle[]> {
    const ohlcv: OHLCV[] = await this.exchange.fetchOHLCV(
      query.symbol,
      query?.timeframe,
      query?.since,
      query?.limit,
      query?.params
    );

    const interpreter: ExchangeResponseInterpreter =
      new ExchangeResponseInterpreter();
    const candles: Candle[] = interpreter.createDataframe(ohlcv);

    return candles;
  }

  public async getBetween(
    query: Query,
    startdate: string,
    enddate: string
  ): Promise<Candle[]> {
    const start: number = moment(`${startdate}T00:00:00Z`).valueOf();
    const end: number = moment(`${enddate}T00:00:00Z`).valueOf();
    const ohlcv: OHLCV[] = [];

    let since = start;
    while (since < end) {
      try {
        const data: OHLCV[] = await this.exchange.fetchOHLCV(
          query.symbol,
          query?.timeframe,
          since,
          query?.limit,
          query?.params
        );
        if (data.length) {
          since = data[data.length - 1][0] + 1;
          ohlcv.push(...data);
        } else {
          break;
        }
      } catch (err) {
        console.error(
          `Failed to fetch data between ${moment(since).utc()} and ${moment(
            end
          ).utc()}: ${err}`
        );
        break;
      }
    }

    const interpreter: ExchangeResponseInterpreter =
      new ExchangeResponseInterpreter();
    const candles: Candle[] = interpreter.createDataframe(ohlcv);

    return candles;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
