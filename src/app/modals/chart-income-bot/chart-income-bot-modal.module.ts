import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartIncomeBotModalComponent } from "./chart-income-bot-modal";
import { ChartExecuteBotComponent } from "@components/charts/chart-execute-bot/chart-execute-bot.component";

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgApexchartsModule],
  declarations: [ChartIncomeBotModalComponent, ChartExecuteBotComponent],
})
export class ChartIncomeBotModalModule {}
