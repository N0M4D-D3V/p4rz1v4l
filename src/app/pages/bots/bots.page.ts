import { Component } from "@angular/core";

@Component({
  selector: "app-bots",
  templateUrl: "./bots.page.html",
  styleUrls: ["./bots.page.scss"],
})
export class BotsPage {
  public bots: string[] = [
    "bot 1",
    "bot 2",
    "bot 3",
    "bot 4",
    "bot 5",
    "bot 6",
    "bot 7",
  ];
}
