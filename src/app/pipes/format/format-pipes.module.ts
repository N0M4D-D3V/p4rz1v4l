import { NgModule } from "@angular/core";
import { IndicatorFormatterPipe } from "./indicator/indicator-format.pipe";

@NgModule({
  declarations: [IndicatorFormatterPipe],
  exports: [IndicatorFormatterPipe],
  imports: [],
  providers: [],
  bootstrap: [],
})
export class FormatPipesModule {}
