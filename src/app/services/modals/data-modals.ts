import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataModalSelectionService {
  public selectedDataModal$: BehaviorSubject<{ index: number, data: any }> = new BehaviorSubject(null);

  constructor() { }

  public getSelectedDataModal(): Observable<{ index: number, data: any }> {
    return this.selectedDataModal$.asObservable();
  }

  public setSelectedDataModal(index: number, data: any): void {
    this.selectedDataModal$.next({ index, data });
  }
}