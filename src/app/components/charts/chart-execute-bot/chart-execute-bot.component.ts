import {
  Component,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MonthsEnglish } from '@dictionary/months/months-en.interface';
import { BacktestResult } from '@interfaces/backtest.interface';
import { ChartComponent } from 'ng-apexcharts';
import { ExecuteBotChartOptions } from './shared-chart-execute-bot/interfaces/shared-chart-execute-bot.interface';

@Component({
  selector: 'app-chart-execute-bot',
  templateUrl: './chart-execute-bot.component.html',
  styleUrls: ['./chart-execute-bot.component.scss'],
})
export class ChartExecuteBotComponent implements OnChanges {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  @Input() resultsInfoIncome: BacktestResult;
  @Input() resultsDataIncome: any;
  public executeChartOptions: Partial<ExecuteBotChartOptions>;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resultsInfoIncome'] && changes['resultsInfoIncome'].currentValue) {
      const closeValues = this.resultsDataIncome.map((item: any) => item.close);
      const monthLabels = this.resultsDataIncome.map((item: any) => this.getMonthNameFromTimestamp(item.timestamp));
      
      this.executeChartOptions = {
        series: [
          {
            name: 'Gráfica',
            data: closeValues
          },
        /*   {
            name: 'Oneplue 9',
            data: [0, 11, 32, 45, 32, 34, 52, 41],
          }, */
        ],
        chart: {
          fontFamily: 'Nunito Sans,sans-serif',
          height: 500,
          type: 'area',
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          width: '1',
        },
        grid: {
          strokeDashArray: 3,
        },

        xaxis: {
          categories: monthLabels,
        },
        tooltip: {
          theme: 'dark',
        },
      };
    }
  }

  private getMonthNameFromTimestamp(timestamp: Date): string {
    const date = new Date(timestamp);
    const monthIndex = date.getMonth();
    return MonthsEnglish[monthIndex];
  }
}
