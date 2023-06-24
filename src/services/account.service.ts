import { Injectable } from "@nestjs/common";
import * as CONFIG from "src/config/config.json";

@Injectable()
export class AccountService {
  public balance: number;

  constructor() {
    if (!this.balance) this.balance = CONFIG.initialBalance;
  }

  public buyBudget(): number {
    return (this.balance * CONFIG.buyBudgetPercentage) / 100;
  }

  public sellBudget(): number {
    return (this.balance * CONFIG.sellBudgetPercentage) / 100;
  }
}
