import { Component, OnInit } from "@angular/core";
import { Product, TopSelling } from "./top-selling-data";

@Component({
  selector: "app-top-selling",
  templateUrl: "./top-selling.component.html",
})
export class TopSellingComponent {
  topSelling: Product[];

  constructor() {
    this.topSelling = TopSelling;
  }
}
