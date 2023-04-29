import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartAmountComponent } from "./chart-amount.component";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgApexchartsModule,
  ],
  declarations: [
    ChartAmountComponent,
  ],
})
export class ChartAmountModule {}
