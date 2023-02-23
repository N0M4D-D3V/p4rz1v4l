import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EditStrategyModal } from "./edit-strategy.modal";

@NgModule({
  declarations: [EditStrategyModal],
  exports: [EditStrategyModal],
  imports: [CommonModule],
  providers: [],
  bootstrap: [],
})
export class EditStrategyModalModule {}
