import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnDestroy {
  public mobileQuery: MediaQueryList;
  public fillerNav: { title: string; path: string }[] = [
    { title: "Home", path: "/home" },
    { title: "Backtest", path: "/backtest" },
    { title: "Genetic Algorithms", path: "/genetic-algorithms" },
    { title: "Strategies", path: "/strategies" },
    { title: "Bots", path: "/bots" },
    { title: "Account", path: "/account" },
    { title: "About", path: "/about" },
  ];

  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
