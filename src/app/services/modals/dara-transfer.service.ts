import { Injectable } from "@angular/core";
import { DataTransfer } from "@interfaces/data-transfer.interface";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataTransferService<T> {
  public selectedDataModal$: BehaviorSubject<DataTransfer<T>> =
    new BehaviorSubject(null);

  constructor() {}

  public getObservable(): Observable<DataTransfer<T>> {
    return this.selectedDataModal$.asObservable();
  }

  public clear(): void {
    this.selectedDataModal$.next(null);
  }

  public setSelectedDataModal(data: DataTransfer<T>): void {
    this.selectedDataModal$.next(data);
  }
}
