import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StrategiesPage } from "./strategies.page";

@NgModule({
  declarations: [StrategiesPage],
  exports: [StrategiesPage],
  imports: [CommonModule],
  providers: [],
  bootstrap: [],
})
export class StrategiesModule {}
