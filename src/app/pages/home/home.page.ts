import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage {
  constructor(private readonly router: Router) {}

  public redirect(path: string): void {
    this.router.navigate([path]);
  }
}
