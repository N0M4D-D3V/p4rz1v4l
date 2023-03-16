import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { IndicatorPopoverModule } from "src/app/popovers/indicator/indicator-popover.module";
import { ItemComponent } from "./item.component";

@NgModule({
  declarations: [ItemComponent],
  exports: [ItemComponent],
  imports: [CommonModule, NgbPopoverModule, IndicatorPopoverModule],
  providers: [],
  bootstrap: [],
})
export class ItemModule {}
