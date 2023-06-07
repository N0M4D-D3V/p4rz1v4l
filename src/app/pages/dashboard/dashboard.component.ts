import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "@core/database/services/user.service";
import { ExchangeFactoryService } from "@services/exchange/exchange-factory.service";
import { ExchangeService } from "@services/exchange/exchange.service";
import { Balances } from "ccxt";

@Component({
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements AfterViewInit {
  public balances: Balances;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly exchangeFactory: ExchangeFactoryService,
    private readonly exchangeService: ExchangeService
  ) {}

  ngAfterViewInit(): void {
    const user = this.userService.currentUser;
    const exchange = this.exchangeFactory.getInstance("binance");

    this.exchangeService.setExchange(exchange);
    this.exchangeService.auth(user?.apiKey, user?.secretKey);
    this.exchangeService
      .getBalances()
      .then((res) => (this.balances = res))
      .catch((err) => {
        alert(err);
        this.router.navigate(["/account"]);
      });
  }

  private noCredentialsAlert(): void {}
}
