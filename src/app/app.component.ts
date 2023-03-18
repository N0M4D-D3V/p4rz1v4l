import { Component, OnInit } from "@angular/core";
import { TabManagerService } from "@components/sidenav";
import { AppRoutingService } from "@services/routing/approuting.services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public currentRouteUrl: string = '';
  
  constructor(
    private appRoutingService: AppRoutingService,
    private tabManager: TabManagerService
  ) {}
  
  ngOnInit(): void {
    this.getCurrentUrl();
  }

  private getCurrentUrl() {
    this.appRoutingService.getCurrentRouteUrl$().subscribe(
      (url) => {
        this.currentRouteUrl = url;
        this.tabManager.currentTabs.forEach((tab) => {
          tab.isCurrentUrl = tab.url === this.currentRouteUrl;
        });
      }
    );
  }
}
