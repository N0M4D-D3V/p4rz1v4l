import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ItemModule } from "@components/item/item.module";
import { EditStrategyModal } from "./edit-strategy.modal";

@NgModule({
  declarations: [EditStrategyModal],
  exports: [EditStrategyModal],
  imports: [CommonModule, ItemModule],
  providers: [],
  bootstrap: [],
})
export class EditStrategyModalModule {}
