import { Component, OnInit } from "@angular/core";
import { topcard, topcards } from "./top-cards-data";

@Component({
  selector: "app-top-cards",
  templateUrl: "./top-cards.component.html",
})
export class TopCardsComponent {
  topcards: topcard[];

  constructor() {
    this.topcards = topcards;
  }
}
