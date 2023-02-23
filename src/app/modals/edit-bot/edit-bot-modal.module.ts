import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EditBotModal } from "./edit-bot.modal";

@NgModule({
  declarations: [EditBotModal],
  exports: [EditBotModal],
  imports: [CommonModule],
  providers: [],
  bootstrap: [],
})
export class EditBotModalModule {}
