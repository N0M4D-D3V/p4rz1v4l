import { Component } from "@angular/core";

@Component({
  selector: "app-strategies",
  templateUrl: "./strategies.page.html",
  styleUrls: ["./strategies.page.scss"],
})
export class StrategiesPage {
  public strategies: string[] = [
    "strat 1",
    "strat 2",
    "strat 3",
    "strat 4",
    "strat 5",
    "strat 6",
    "strat 7",
  ];
}
