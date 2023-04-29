import { Component, ViewChild } from "@angular/core";
import { MonthsEnglish } from "@dictionary/months/months-en.interface";
import { ChartComponent } from "ng-apexcharts";
import { AmountChartOptions } from "./shared-chart-amount/interfaces/shared-chart-amount.interface";

@Component({
  selector: "app-chart-amount",
  templateUrl: "./chart-amount.component.html",
  styleUrls: ["./chart-amount.component.scss"],
})
export class ChartAmountComponent {
  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public amountChartOptions: Partial<AmountChartOptions>;
  constructor() {
    this.amountChartOptions = {
      series: [
        {
          name: "Iphone 13",
          data: [0, 31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "Oneplue 9",
          data: [0, 11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        fontFamily: "Nunito Sans,sans-serif",
        height: 250,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: "1",
      },
      grid: {
        strokeDashArray: 3,
      },

      xaxis: {
        categories:
          MonthsEnglish
        ,
      },
      tooltip: {
        theme: "dark",
      },
    };
  }
}
