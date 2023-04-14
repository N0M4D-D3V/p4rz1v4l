import {
  Component,
  AfterViewInit,
  EventEmitter,
  Output,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { TabManagerService } from "@components/tab/shared-tab/services/tab-manager.service";
import { BotDetailService } from "@services/pages/bot/bot-page.service";
import { Subscription } from "rxjs";
import { CustomRouterReuseStrategy } from "src/app/shared/routes/custom-router-reused";
import { Tab } from "../tab/shared-tab/models";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() menuToggled = new EventEmitter<void>();

  private botRemovedSubscription: Subscription;
  public tabs$ = this.tabManager.openedTabs$;

  constructor(
    private tabManager: TabManagerService,
    private botDetailService: BotDetailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onSusbscriptionRemove();
  }

  async onTabClosed(tab: Tab): Promise<void> {
    this.tabManager.removeTab(tab);
    await this.navigateToBotPage();

    this.deleteStoredRoute(tab.url);
  }

  private onSusbscriptionRemove() {
    this.botRemovedSubscription = this.botDetailService.botRemoved$.subscribe(
      (botId) => {
        this.handleBotRemoved(botId);
      }
    );
  }

  private navigateToBotPage(): void {
    this.router.navigate(["/bots"]);
  }

  private deleteStoredRoute(url: string): void {
    const strategy = this.router
      .routeReuseStrategy as CustomRouterReuseStrategy;

    strategy.deleteStoredRoute(url);
  }

  public handleBotRemoved(botId: number): void {
    const botTab = this.tabManager.getTabByUrl(`/bot/${botId}`);

    if (botTab) {
      this.tabManager.removeTab(botTab);
    }
  }

  toggleSidebarComunication() {
    this.menuToggled.emit();
  }

  ngOnDestroy(): void {
    this.botRemovedSubscription.unsubscribe();
  }

  // This is for Notifications
  /*   notifications: Object[] = [
    {
      btn: "btn-danger",
      icon: "ti-link",
      title: "Luanch Admin",
      subject: "Just see the my new admin!",
      time: "9:30 AM",
    },
    {
      btn: "btn-success",
      icon: "ti-calendar",
      title: "Event today",
      subject: "Just a reminder that you have event",
      time: "9:10 AM",
    },
    {
      btn: "btn-info",
      icon: "ti-settings",
      title: "Settings",
      subject: "You can customize this template as you want",
      time: "9:08 AM",
    },
    {
      btn: "btn-warning",
      icon: "ti-user",
      title: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:00 AM",
    },
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: "assets/images/users/user1.jpg",
      status: "online",
      from: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:30 AM",
    },
    {
      useravatar: "assets/images/users/user2.jpg",
      status: "busy",
      from: "Sonu Nigam",
      subject: "I have sung a song! See you at",
      time: "9:10 AM",
    },
    {
      useravatar: "assets/images/users/user2.jpg",
      status: "away",
      from: "Arijit Sinh",
      subject: "I am a singer!",
      time: "9:08 AM",
    },
    {
      useravatar: "assets/images/users/user4.jpg",
      status: "offline",
      from: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:00 AM",
    },
  ];

  public selectedLanguage: any = {
    language: "English",
    code: "en",
    type: "US",
    icon: "us",
  };

  public languages: any[] = [
    {
      language: "English",
      code: "en",
      type: "US",
      icon: "us",
    },
    {
      language: "Español",
      code: "es",
      icon: "es",
    },
    {
      language: "Français",
      code: "fr",
      icon: "fr",
    },
    {
      language: "German",
      code: "de",
      icon: "de",
    },
  ]; */
}
