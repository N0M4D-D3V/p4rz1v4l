import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotsPage } from '../bot-list/bots.page';

import { BotDetailsComponent } from './bot-detail.component';
import { BotResolver } from './resolver/bot.resolver';

const routes: Routes = [
  {
    path: '',
    component: BotsPage,
    pathMatch: 'full',
    data: {
      mustBeStored: true,
    },
  },
  {
    path: ':id',
    component: BotDetailsComponent,
    data: {
      mustBeStored: true,
    },
    resolve: {
      quotation: BotResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotDetailsRoutingModule {}
