import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormBuilder } from "@angular/forms";
import { ExchangeFactoryService } from "@services/exchange/exchange-factory.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TabBarModule } from "@components/sidenav";
import { StrategyService } from "@services/strategy/strategy.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    NgbModule,
    TabBarModule,
  ],
  providers: [FormBuilder, ExchangeFactoryService, StrategyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
