import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";

import { NavBarComponent } from "./nav/nav-bar.component";
import { TabComponent } from "./tab/tab.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [NavBarComponent, TabComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [NavBarComponent, TabComponent],
})
export class TabBarModule {}
