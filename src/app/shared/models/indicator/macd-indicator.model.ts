import { IndicatorOption } from "@interfaces/indicator.interface";
import { AbstractIndicator } from "@models/abstract/abstract-indicator.model";
import { IndicatorInfo } from "@interfaces/indicator.interface";
import { MACD } from "@debut/indicators";
import { Candle } from "@interfaces/candle";

/**
 * En un mercado alcista el historiograma del MACD aparecera por encima de la linea cero,
 * junto con la linea de signal.
 *
 * En un mercado bajista, el historiograma del MACD aparecera por debajo de la linea cero,
 * junto con la linea de signal.
 *
 * Además, la tendencia será más fuerte en las fases donde la línea de señal está dentro del
 * histograma (más baja que el histograma de tendencia alcista y más alta que el histograma
 * de tendencia bajista).
 */
export interface MACDValues {
  macd: number;
  emaFast: number;
  emaSlow: number;
  signal: number;
  histogram: number;
}

export class MACDIndicator extends AbstractIndicator {
  private periodEmaFast: number = 30;
  private periodEmaSlow: number = 30;
  private periodSignal: number = 70;

  private macd: MACD;

  constructor(ind: IndicatorInfo) {
    super();
    this.name = ind.name;
    this.symbol = ind.symbol;
    this.provisionalID = ind.provisionalID;
    this.operationType = ind.operationType;
    this.config = ind.config;

    this.config.forEach(
      (option: IndicatorOption) => (this[option.variable] = option.value)
    );

    this.macd = new MACD(
      this.periodEmaFast,
      this.periodEmaSlow,
      this.periodSignal
    );
  }

  /**
   * Señal de compra del MACD: el histograma pasa de un valor negativo a un valor
   * positivo para comprar en el mercado.
   *
   * Señal de compra del MACD: La línea de señal pasa por encima del nivel cero
   *
   * @param candle
   * @returns
   */
  public checkLongSignal(candle: Candle): boolean {
    if (this.isShortMode()) return false;

    const momentValue: MACDValues = this.macd.momentValue(candle.close);
    const nextValue: MACDValues = this.macd.nextValue(candle.close);
    let result: boolean = false;

    if (momentValue?.histogram <= 0 && nextValue?.histogram > 0) result = true;
    if (momentValue?.signal <= 0 && nextValue?.signal > 0) result = true;

    return result;
  }

  /**
   * Señal de venta del MACD: el histograma pasa de un valor positivo a un valor
   * negativo para vender en el mercado.
   *
   * Señal de venta MACD: La línea de señal pasa por debajo del nivel cero
   *
   * @param candle
   * @returns
   */
  public checkShortSignal(candle: Candle): boolean {
    if (this.isLongMode()) return false;

    const momentValue: MACDValues = this.macd.momentValue(candle.close);
    const nextValue: MACDValues = this.macd.nextValue(candle.close);
    let result: boolean = false;

    if (momentValue.histogram >= 0 && nextValue.histogram < 0) result = true;
    if (momentValue.signal >= 0 && nextValue.signal < 0) result = true;

    return result;
  }
}
