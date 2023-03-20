import { Injectable } from "@angular/core";
import { AbstractObservableService } from "../abstract/abstract-observable.service";
import { Strategy } from "@interfaces/strategies.interface";

@Injectable({ providedIn: "root" })
export class StrategyService extends AbstractObservableService<Strategy> {}
