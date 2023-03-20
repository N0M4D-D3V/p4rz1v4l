import { BehaviorSubject, Observable } from "rxjs";

export abstract class AbstractObservableService<T> {
  protected bs: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  protected observable: Observable<T[]> = this.bs.asObservable();

  constructor() {}

  public updateObservable(values: T[] | T): void {
    if (!Array.isArray(values)) values = [values];

    this.bs.next([]);
    values.forEach((value: T) => this.bs.getValue().push(value));
    this.bs.next(this.bs.getValue());
  }

  public updateOne(value: T, key: string = "id"): void {
    const storedValues: T[] = this.bs.getValue();
    const foundedIndex: number = storedValues.findIndex(
      (item: T) => item[key] === value[key]
    );

    if (foundedIndex >= 0) storedValues[foundedIndex] = value;
    else storedValues.push({ ...value, id: storedValues.length });

    this.updateObservable(storedValues);
  }

  public deleteOne(value: T, key: string = "id"): void {
    const storedValues: T[] = this.bs.getValue();
    const foundedIndex: number = storedValues.findIndex(
      (item: T) => item[key] === value[key]
    );

    if (foundedIndex >= 0) {
      storedValues.splice(foundedIndex, 1);
      this.updateObservable(storedValues);
    }
  }

  public updateAtIndex(index: number, value: T): void {
    const storedValues: T[] = this.bs.getValue();
    storedValues[index] = value;
    this.updateObservable(storedValues);
  }

  public deleteAtIndex(index: number): void {
    const storedValues: T[] = this.bs.getValue();

    if (index >= 0) {
      storedValues.splice(index, 1);
      this.updateObservable(storedValues);
    }
  }

  public getObservable(): Observable<T[]> {
    return this.observable;
  }

  public clearObservable(): void {
    this.bs.next([]);
  }
}
