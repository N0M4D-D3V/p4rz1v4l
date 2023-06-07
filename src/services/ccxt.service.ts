import { Injectable } from "@nestjs/common";
import ccxt, { Exchange, OHLCV, binance } from "ccxt";
import { Candle } from "src/interfaces/candle.interface";
import { ExchangeResponseInterpreter } from "./exchange-response-interpreter.service";
import moment from "moment";
import { Query } from "src/interfaces/query.interface";

@Injectable()
export class CcxtService {
  private exchange: Exchange = new binance();

  constructor(private readonly interpreter: ExchangeResponseInterpreter) {}

  public async getAll(query: Query): Promise<Candle[]> {
    const ohlcv: OHLCV[] = await this.exchange.fetchOHLCV(
      query.symbol,
      query?.timeframe,
      query?.since,
      query?.limit,
      query?.params
    );

    const candles: Candle[] = this.interpreter.createDataframe(ohlcv);
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
}
