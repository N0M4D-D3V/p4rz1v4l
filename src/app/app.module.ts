import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormBuilder } from "@angular/forms";
import { ExchangeFactoryService } from "@services/exchange/exchange-factory.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StrategyService } from "@services/strategy/strategy.service";
import { SidebarComponent } from "@components/sidebar/sidebar.component";
import { FullComponent } from "./layouts/full/full.component";
import { HeaderComponent } from "@components/header/header.component";
import { TabBarModule } from "@components/tab/tab.module";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FullComponent,
    HeaderComponent,
  ],
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
