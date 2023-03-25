import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegularExpressionDirective } from "./regularExpressionsIntoInput.directive";

@NgModule({
  declarations: [RegularExpressionDirective],
  imports: [CommonModule],
  exports: [RegularExpressionDirective],
})
export class DirectivesModule {}
