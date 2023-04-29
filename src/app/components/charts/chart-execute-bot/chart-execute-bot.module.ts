import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartExecuteBotComponent } from "./chart-execute-bot.component";

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgApexchartsModule],
  declarations: [ChartExecuteBotComponent],
})
export class ChartExecuteBotModule {}
