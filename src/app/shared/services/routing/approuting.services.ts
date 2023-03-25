import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { filter, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AppRoutingService {
  private currentRouteUrl$ = new BehaviorSubject<string>("");

  constructor(public router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRouteUrl$.next(event.urlAfterRedirects);
      }
    });
  }

  getCurrentRouteUrl$() {
    return this.currentRouteUrl$.asObservable();
  }
}
