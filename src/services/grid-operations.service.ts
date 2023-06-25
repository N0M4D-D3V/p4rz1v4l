import { Injectable } from "@nestjs/common";
import { Operation } from "src/enum/operation.enum";
import * as CONFIG from "src/config/config.json";
import { isCloseTo } from "src/common/functions";

@Injectable()
export class GridOperationsService {
  private basePrice: number = CONFIG.basePrice;
  private buyPercentages: number[] = CONFIG.buyPercentages;
  private sellPercentages: number[] = CONFIG.sellPercentages;

  constructor() {}

  public getOperation(price: number): Operation {
    if (this.shouldBuy(price)) return Operation.Buy;
    if (this.shouldSell(price)) return Operation.Sell;

    return Operation.None;
  }

  //TODO
  // CHECK MONEY AND QUANTITY
  // CHECK LAST SELL OPERATIONS
  private shouldSell(price: number): boolean {
    let shouldSell: boolean = false;
    const values: number[] = [];

    this.sellPercentages.forEach((per: number) =>
      values.push((per * this.basePrice) / 100 + this.basePrice)
    );

    for (let indx = 0; indx < values.length; indx++) {
      const isClose: boolean = isCloseTo(price, values[indx], CONFIG.precision);

      if (isClose) {
        shouldSell = true;
        break;
      }
    }

    return shouldSell;
  }

  //TODO
  // CHECK MONEY
  // CHECK LAST BUY OPERATIONS
  private shouldBuy(price: number): boolean {
    let shouldBuy: boolean = false;
    const values: number[] = [];

    this.buyPercentages.forEach((per: number) =>
      values.push((per * this.basePrice) / 100 - this.basePrice)
    );

    for (let indx = 0; indx < values.length; indx++) {
      const isClose: boolean = isCloseTo(price, values[indx], CONFIG.precision);

      if (isClose) {
        shouldBuy = true;
        break;
      }
    }

    return shouldBuy;
  }
}
