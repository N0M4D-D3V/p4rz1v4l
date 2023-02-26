import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditBotModal } from "./edit-bot.modal";

@NgModule({
  declarations: [EditBotModal],
  exports: [EditBotModal],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [],
})
export class EditBotModalModule {}
