import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ResultsComponent } from "./results.component";
@NgModule({
  declarations: [ResultsComponent],
  exports: [ResultsComponent],
  imports: [CommonModule],
  providers: [],
  bootstrap: [],
})
export class ResultsModule {}
