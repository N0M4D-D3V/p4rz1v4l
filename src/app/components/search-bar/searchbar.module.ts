import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SearchBarComponent } from "./searchbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [SearchBarComponent],
  exports: [SearchBarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [],
})
export class SearchBarModule {}
