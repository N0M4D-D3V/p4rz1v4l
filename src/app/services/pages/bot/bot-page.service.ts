import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  tap,
  withLatestFrom,
} from 'rxjs';

import { BotDetail } from '@interfaces/bot-detail.interface';
import { dummyData } from '@mocks/dummy.data';

@Injectable({ providedIn: 'root' })
export class BotDetailService {
  private _bots$ = new BehaviorSubject<BotDetail[]>(dummyData);
  bots$ = this._bots$.asObservable();

  constructor() {}

  getById(id: number): Observable<BotDetail | null> {
    return this.bots$.pipe(
      map(
        (bots) =>
          bots.find((bot) => bot.id === id) ?? null
      )
    );
  }

  save(botsDetails: BotDetail): Observable<BotDetail> {
    return of(botsDetails).pipe(
      map((botsDetails) => ({
        ...botsDetails,
        lastModified: new Date().toISOString(),
      })),
      withLatestFrom(this.bots$),
      tap(([botsDetails, state]) => {
        const newState = this.saveReducer(botsDetails, state);
        this._bots$.next(newState);
      }),
      map(([botsDetails, _]) => botsDetails)
    );
  }

  private saveReducer(botsDetails: BotDetail, state: BotDetail[]): BotDetail[] {
    const botIndex = state.findIndex((item) => item.id === botsDetails.id);

    if (botIndex === -1) {
      return [...state, botsDetails];
    }

    const newState = [...state];
    newState.splice(botIndex, 1, botsDetails);
    return newState;
  }
}
