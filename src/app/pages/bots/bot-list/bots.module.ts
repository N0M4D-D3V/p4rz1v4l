import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotsPage } from '../bot-list/bots.page';
import { BotDetailsComponent } from '../bot-details/bot-detail.component';
import { BotResolver } from '../bot-details/resolver/bot.resolver';


const routes: Routes = [
  {
    path: '',
    component: BotsPage,
    pathMatch: 'full',
   
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
export class BotsRoutingModule {}
