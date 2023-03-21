import { Injectable } from "@angular/core";
import { Exchange, OHLCV, Params } from "ccxt";
import { Candle } from "@interfaces/candle";
import { ExchangeResponseInterpreter } from "@models/exchange/ExchangeResponseInterpreter";

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
}
