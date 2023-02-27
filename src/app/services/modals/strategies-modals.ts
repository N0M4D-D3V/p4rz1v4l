import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StrategySelectionService {
  public selectedStrategy$: BehaviorSubject<{ index: number, data: any }> = new BehaviorSubject(null);

  constructor() { }

  public getSelectedStrategy(): Observable<{ index: number, data: any }> {
    return this.selectedStrategy$.asObservable();
  }

  public setSelectedStrategy(index: number, data: any): void {
    this.selectedStrategy$.next({ index, data });
  }
}