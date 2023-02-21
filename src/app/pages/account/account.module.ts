import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccountRoutingModule } from "./account-routing.module";
import { AccountPage } from "./account.page";

@NgModule({
  declarations: [AccountPage],
  exports: [AccountPage],
  imports: [CommonModule, AccountRoutingModule],
  providers: [],
  bootstrap: [],
})
export class AccountModule {}
