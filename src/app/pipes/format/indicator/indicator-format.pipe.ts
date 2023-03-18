import { TitleCasePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { IndicatorInfo } from "@interfaces/indicator.interface";

@Pipe({ name: "indicatorFormatter" })
export class IndicatorFormatterPipe implements PipeTransform {
  public transform(value: IndicatorInfo): string {
    const capitalizer = new TitleCasePipe();
    let symbol: string = "";

    if (value?.symbol) {
      symbol = " (" + value.symbol.toUpperCase() + ")";
    }

    const response: string = capitalizer.transform(value.name) + symbol;

    return response;
  }
}
