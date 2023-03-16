import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { IndicatorPopoverComponent } from "./indicator.popover";

@NgModule({
  declarations: [IndicatorPopoverComponent],
  exports: [IndicatorPopoverComponent],
  imports: [CommonModule, NgbPopoverModule],
  providers: [],
  bootstrap: [],
})
export class IndicatorPopoverModule {}
