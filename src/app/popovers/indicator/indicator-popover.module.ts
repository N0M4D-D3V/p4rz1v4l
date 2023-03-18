import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { IndicatorPopoverComponent } from "./indicator.popover";
import { FormatPipesModule } from '../../pipes/format/format-pipes.module';

@NgModule({
  declarations: [IndicatorPopoverComponent],
  exports: [IndicatorPopoverComponent],
  imports: [CommonModule, NgbPopoverModule, FormatPipesModule],
  providers: [],
  bootstrap: [],
})
export class IndicatorPopoverModule {}
