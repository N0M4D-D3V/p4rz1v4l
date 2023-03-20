import { Component, OnInit } from "@angular/core";
import { TabManagerService } from "@components/sidenav";
import { STRATEGIES_MOCK } from "@mocks/dummy.data";
import { AppRoutingService } from "@services/routing/approuting.services";
import { StrategyService } from "@services/strategy/strategy.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public currentRouteUrl: string = "";

  constructor(
    private readonly appRoutingService: AppRoutingService,
    private readonly tabManager: TabManagerService,
    private readonly strategyService: StrategyService
  ) {}

  ngOnInit(): void {
    this.getCurrentUrl();
    this.loadMocks();
  }

  private getCurrentUrl() {
    this.appRoutingService.getCurrentRouteUrl$().subscribe((url) => {
      this.currentRouteUrl = url;
      this.tabManager.currentTabs.forEach((tab) => {
        tab.isCurrentUrl = tab.url === this.currentRouteUrl;
      });
    });
  }

  private loadMocks(): void {
    this.strategyService.updateObservable(STRATEGIES_MOCK);
  }
}
