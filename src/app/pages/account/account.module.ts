import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccountRoutingModule } from "./account-routing.module";
import { AccountPage } from "./account.page";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AccountPage],
  exports: [AccountPage],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [],
})
export class AccountModule {}
