import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ItemModule } from "@components/item/item.module";
import { EditStrategyModal } from "./edit-strategy.modal";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { IndicatorPopoverModule } from "src/app/popovers/indicator/indicator-popover.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [EditStrategyModal],
  exports: [EditStrategyModal],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ItemModule,
    NgbPopoverModule,
    IndicatorPopoverModule,
  ],
  providers: [],
  bootstrap: [],
})
export class EditStrategyModalModule {}
