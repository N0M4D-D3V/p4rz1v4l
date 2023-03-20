import { MediaMatcher } from "@angular/cdk/layout";
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  Input,
} from "@angular/core";
import { Router } from "@angular/router";
import { CustomRouterReuseStrategy } from "src/app/shared/routes/custom-router-reused";

import { Tab } from "../shared-navbar/model";
import { TabManagerService } from "../shared-navbar/services/tab-manager.service";

@Component({
  selector: "nav-tab-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit, OnDestroy {
  @Input() canNavigate = true;

  tabs$ = this.tabManager.openedTabs$;

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

  constructor(
    private tabManager: TabManagerService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {}

   navigateToBotPage(): void {
    this.router.navigate(["/bots"]);
  }

  async onTabClosed(tab: Tab): Promise<void> {
    this.tabManager.removeTab(tab);
    await this.navigateToBotPage();

    this.deleteStoredRoute(tab.url);
  }

  private deleteStoredRoute(url: string): void {
    const strategy = this.router
      .routeReuseStrategy as CustomRouterReuseStrategy;

    strategy.deleteStoredRoute(url);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
