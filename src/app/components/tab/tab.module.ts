import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TabComponent } from "./tab.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [TabComponent],
  imports: [CommonModule, RouterModule],
  exports: [TabComponent],
})
export class TabBarModule {}
