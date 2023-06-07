import { Component, OnInit } from "@angular/core";
import { TabManagerService } from "@components/tab/shared-tab/services/tab-manager.service";
import { STRATEGIES_MOCK } from "@mocks/dummy.data";
import { AppRoutingService } from "@services/routing/approuting.services";
import { StrategyService } from "@services/strategy/strategy.service";
import { LocalStorageService } from "@core/database/services/local-storage.service";
import { generateRandomKey } from "@common/functions";
import { UserService } from "@core/database/services/user.service";
import { User } from "@interfaces/user.interface";

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
    private readonly localStorageService: LocalStorageService,
    private readonly userService: UserService,
    private readonly strategyService: StrategyService
  ) {}

  ngOnInit(): void {
    this.getCurrentUrl();
    this.loadMocks();
    this.loadRandomKey();
    this.logUser();
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

  private loadRandomKey(): void {
    const randomKey: string = this.localStorageService.get("AppRandomKey");

    if (!randomKey) {
      const newRandomKey: string = generateRandomKey();
      this.localStorageService.set<string>("AppRandomKey", newRandomKey);
    }
  }

  private logUser(): void {
    this.userService
      .getById(1)
      .then((user: User) => (this.userService.currentUser = user))
      .catch((err) => console.error(err));
  }
}
