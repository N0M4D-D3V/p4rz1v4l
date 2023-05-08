import { Injectable } from "@angular/core";
import { LocalStorageKey } from "@custom-types/local-storage.types";

@Injectable({ providedIn: "root" })
export class LocalStorageService {
  constructor() {}

  public get<T>(key: LocalStorageKey): T {
    return JSON.parse(localStorage.getItem(key)) as T;
  }

  public set<T>(key: LocalStorageKey, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
