import { IndicatorOption } from "@interfaces/indicator.interface";
import { OperationType } from "@interfaces/backtest.interface";
import { IndicatorInfo } from "@interfaces/indicator.interface";
import { Candle } from "@interfaces/candle";

export abstract class AbstractIndicator implements IndicatorInfo {
  name: string;
  symbol?: string;
  provisionalID?: number;
  operationType?: OperationType;
  config?: IndicatorOption[];

  public abstract checkLongSignal(df: Candle): boolean;
  public abstract checkShortSignal(df: Candle): boolean;

  protected isShortMode(): boolean{
    return this.operationType === OperationType.Short
  }

  protected isLongMode(): boolean{
    return this.operationType === OperationType.Long
  }
}
