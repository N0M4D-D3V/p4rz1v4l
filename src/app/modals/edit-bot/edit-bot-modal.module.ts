import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditBotModalComponent } from "./edit-bot.modal";

@NgModule({
  declarations: [EditBotModalComponent],
  exports: [EditBotModalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [],
})
export class EditBotModalModule {}
