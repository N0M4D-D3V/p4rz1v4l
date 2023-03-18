import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { IndicatorPopoverComponent } from "./indicator.popover";
import { FormatPipesModule } from "@pipes/format/format-pipes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IndicatorFactory } from "@services/factory/indicator-factory/indicator-factory.service";

@NgModule({
  declarations: [IndicatorPopoverComponent],
  exports: [IndicatorPopoverComponent],
  imports: [
    CommonModule,
    NgbPopoverModule,
    FormsModule,
    ReactiveFormsModule,
    FormatPipesModule,
  ],
  providers: [IndicatorFactory],
  bootstrap: [],
})
export class IndicatorPopoverModule {}
