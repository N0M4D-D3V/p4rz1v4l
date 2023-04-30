import { Table } from "dexie";
import { Injectable } from "@angular/core";
import { BacktestingDataset } from "./db.config";
import { AppDatabase } from "./db";
import { User } from "@interfaces/user.interface";

@Injectable({ providedIn: "root" })
export class DatabaseService {
  private db: AppDatabase = new AppDatabase();

  constructor() {}

  public getAppDatabase(): AppDatabase {
    return this.db;
  }

  public getBacktestingDatasets(): Table<BacktestingDataset, number> {
    return this.db.backtestingDatasets;
  }

  public getUser(): Table<User, number> {
    return this.db.user;
  }
}
