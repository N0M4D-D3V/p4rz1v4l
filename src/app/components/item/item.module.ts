import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { ItemComponent } from "./item.component";

@NgModule({
  declarations: [ItemComponent],
  exports: [ItemComponent],
  imports: [CommonModule, NgbPopoverModule],
  providers: [],
  bootstrap: [],
})
export class ItemModule {}
