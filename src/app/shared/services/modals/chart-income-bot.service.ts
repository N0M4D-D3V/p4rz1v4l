import { Injectable } from '@angular/core';
import { BacktestResult } from '@interfaces/backtest.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartIncomeBotService {
  private resultsSourceInfo = new BehaviorSubject<BacktestResult>(null);
  public resultsInfo$ = this.resultsSourceInfo.asObservable();

  private resultsSourceData = new BehaviorSubject<any>(null);
  public resultsData$ = this.resultsSourceData.asObservable();

  constructor() {}

  public infoResults(infoResults: BacktestResult): void {
    this.resultsSourceInfo.next(infoResults);
  }

  public dataResults(dataResults: any): void {
    this.resultsSourceData.next(dataResults);
  }
}