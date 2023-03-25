import { AppRoutingService } from "@services/routing/approuting.services";
import { TabManagerService } from "@components/sidenav";

export function updateTabCurrentUrl(
  appRoutingService: AppRoutingService,
  tabManager: TabManagerService
): void {
  let currentRouteUrl: string = "";

  appRoutingService.getCurrentRouteUrl$().subscribe((url) => {
    currentRouteUrl = url;
    tabManager.currentTabs.forEach((tab) => {
      tab.isCurrentUrl = tab.url === currentRouteUrl;
    });
  });
}
