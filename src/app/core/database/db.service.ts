import { Candle } from "@interfaces/candle";
import Dexie, { Table } from "dexie";
import { VERSION_DB } from "../version/version";
import { liveQuery, Observable } from "dexie";
import { Injectable } from "@angular/core";
import { DB_NAME, DB_STRUCTURE } from "./db.config";

@Injectable({ providedIn: "root" })
export class DatabaseService extends Dexie {
  private backtestingCandles!: Table<Candle, number>;

  constructor() {
    super(DB_NAME);
    this.version(VERSION_DB).stores(DB_STRUCTURE);
  }

  public getCandles(): Observable<Candle[]> {
    return liveQuery(() => this.backtestingCandles.toArray());
  }

  public async bulkCandles(candles: Candle[]): Promise<void> {
    await this.backtestingCandles.bulkAdd(candles);
  }
}
