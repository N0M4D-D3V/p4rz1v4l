import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, first, mergeMap, Observable, of } from 'rxjs';

import { BotDetail } from '@interfaces/bot-detail.interface';
import { BotDetailService } from '@services/pages/bot/bot-page.service';

@Injectable({ providedIn: 'root' })
export class BotResolver implements Resolve<BotDetail> {
  constructor(
    private quotationsService: BotDetailService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<BotDetail> | Observable<never> {
    const id = route.paramMap.get('id');

    if (id === null) {
      return EMPTY;
    }

    return this.quotationsService.getById(Number(id)).pipe(
      first(),
      mergeMap((quotation) => {
        if (quotation === null) {
          this.router.navigateByUrl('/bot');
          return EMPTY;
        }

        return of(quotation);
      })
    );
  }
}
