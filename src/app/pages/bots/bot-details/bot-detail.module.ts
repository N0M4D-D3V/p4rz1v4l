import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { BotDetailsRoutingModule } from "./bot-detail-routing.module";

import { BotsPage } from "../bot-list/bots.page";
import { BotDetailsComponent } from "./bot-detail.component";
import { EditBotModalModule } from "@modals/edit-bot/edit-bot-modal.module";
import { SearchBarModule } from "@components/search-bar/searchbar.module";
import { DirectivesModule } from "@directives/directives.module";

@NgModule({
  declarations: [BotsPage, BotDetailsComponent],
  imports: [
    CommonModule,
    BotDetailsRoutingModule,
    ReactiveFormsModule,
    EditBotModalModule,
    SearchBarModule,
    DirectivesModule,
  ],
})
export class BotDetailsModule {
  constructor() {}
}
