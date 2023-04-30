import { liveQuery, Observable, Table } from "dexie";
import { Injectable } from "@angular/core";
import { BacktestingDataset } from "../db.config";
import { DatabaseService } from "../db.service";

@Injectable({ providedIn: "root" })
export class BacktestingDatasetService {
  constructor(private readonly db: DatabaseService) {}

  private get backtestingDatasets(): Table<BacktestingDataset, number> {
    return this.db.getBacktestingDatasets();
  }

  public getAll(): Observable<BacktestingDataset[]> {
    return liveQuery(() => this.backtestingDatasets.toArray());
  }

  public async getOne(id: number): Promise<BacktestingDataset> {
    return await this.backtestingDatasets.get(parseFloat(id.toString()));
  }

  public async bulk(dataset: BacktestingDataset[]): Promise<void> {
    await this.backtestingDatasets.bulkAdd(dataset);
  }

  public async add(dataset: BacktestingDataset): Promise<void> {
    await this.backtestingDatasets.add(dataset);
  }

  public async update(id: number, dataset: BacktestingDataset): Promise<void> {
    await this.backtestingDatasets.update(id, dataset);
  }

  public async delete(id: number): Promise<void> {
    await this.backtestingDatasets.delete(parseFloat(id.toString()));
  }
}
