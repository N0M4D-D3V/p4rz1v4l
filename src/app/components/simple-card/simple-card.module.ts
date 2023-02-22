import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatCardModule } from "@angular/material/card";

import { RouterModule } from "@angular/router";
import { SimpleCardComponent } from "./simple-card.component";

@NgModule({
  declarations: [SimpleCardComponent],
  exports: [SimpleCardComponent],
  imports: [CommonModule, RouterModule, MatCardModule],
  providers: [],
  bootstrap: [],
})
export class SimpleCardModule {}
