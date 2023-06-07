import { Candle } from "src/interfaces/candle.interface";
import { CcxtService } from "../../services/ccxt.service";
import { Controller, Get, HttpStatus, Res } from "@nestjs/common";

@Controller("ccxt")
export class CcxtController {
  constructor(private readonly ccxtService: CcxtService) {}

  @Get()
  public async getAll(@Res() res): Promise<void> {
    this.ccxtService
      .getAll({
        symbol: "BTC/USDT",
        timeframe: "1s",
        limit: 1000,
      })
      .then((candles: Candle[]) => res.status(HttpStatus.OK).json(candles))
      .catch((err) => res.status(HttpStatus.FORBIDDEN).json(err));
  }
}
