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

  public updateOne(value: T, key: string): T[] {
    const storedValues: T[] = this.bs.getValue();
    const foundedIndex: number = storedValues.findIndex(
      (item: T) => item[key] === value[key]
    );

    if (foundedIndex >= 0) storedValues[foundedIndex] = value;
    else storedValues.push(value);

    this.updateObservable(storedValues);

    return this.bs.getValue();
  }

  public deleteOne(value: T, key: string): T[] {
    const storedValues: T[] = this.bs.getValue();
    const foundedIndex: number = storedValues.findIndex(
      (item: T) => item[key] === value[key]
    );

    if (foundedIndex >= 0) {
      storedValues.splice(foundedIndex, 1);
      this.updateObservable(storedValues);
    }

    return this.bs.getValue();
  }

  public getObservable(): Observable<T[]> {
    return this.observable;
  }

  public clearObservable(): void {
    this.bs.next([]);
  }
}
