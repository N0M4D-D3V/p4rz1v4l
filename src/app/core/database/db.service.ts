import { liveQuery, Observable, PromiseExtended } from "dexie";
import { Injectable } from "@angular/core";
import { BacktestingDataset } from "./db.config";
import { AppDatabase } from "./db";

@Injectable({ providedIn: "root" })
export class DatabaseService {
  private db: AppDatabase = new AppDatabase();

  constructor() {}

  public getAllBacktestingDatasets(): Observable<BacktestingDataset[]> {
    return liveQuery(() => this.db.backtestingDatasets.toArray());
  }

  public async getOneBacktestingDataset(
    id: number
  ): Promise<BacktestingDataset> {
    return await this.db.backtestingDatasets.get(parseFloat(id.toString()));
  }

  public async bulkBacktestingDataset(
    dataset: BacktestingDataset[]
  ): Promise<void> {
    await this.db.backtestingDatasets.bulkAdd(dataset);
  }

  public async addBacktestingDataset(
    dataset: BacktestingDataset
  ): Promise<void> {
    await this.db.backtestingDatasets.add(dataset);
  }

  public async updateBacktestingDataset(
    id: number,
    dataset: BacktestingDataset
  ): Promise<void> {
    await this.db.backtestingDatasets.update(id, dataset);
  }

  public async deleteBacktestingDataset(id: number): Promise<void> {
    await this.db.backtestingDatasets.delete(parseFloat(id.toString()));
  }
}
