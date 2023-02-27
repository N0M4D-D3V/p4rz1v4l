import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SimpleCardModule } from "@components/simple-card/simple-card.module";
import { EditBotModalModule } from "@modals/edit-bot/edit-bot-modal.module";
import { BotsRoutingModule } from "./bots-routing.module";
import { BotsPage } from "./bots.page";

@NgModule({
  declarations: [BotsPage],
  exports: [BotsPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BotsRoutingModule,
    SimpleCardModule,
    EditBotModalModule,
  ],
  providers: [],
  bootstrap: [],
})
export class BotsModule {}
