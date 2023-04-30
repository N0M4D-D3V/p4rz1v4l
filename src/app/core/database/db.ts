import Dexie, { Table } from "dexie";
import { BacktestingDataset, DB_NAME, DB_STRUCTURE } from "./db.config";
import { VERSION_DB } from "@core/version/version";
import { User } from "@interfaces/user.interface";

export class AppDatabase extends Dexie {
  public backtestingDatasets!: Table<BacktestingDataset, number>;
  public user!: Table<User, number>;

  constructor() {
    super(DB_NAME);
    this.version(VERSION_DB).stores(DB_STRUCTURE);
  }
}
