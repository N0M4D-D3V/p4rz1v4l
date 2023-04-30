import { Component, OnInit } from "@angular/core";
import { ROUTES_MENU } from "./shared-sidebar/interfaces/sidebar.interface";
import { RoutesMenu } from "./shared-sidebar/models/routes-sidebar.model";
import { UserService } from "@services/user/user.service";
import { Observable, filter, map } from "rxjs";
import { User } from "@interfaces/user.interface";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  showMenu = "";
  showSubMenu = "";
  public sidebarnavItems: RoutesMenu[] = [];
  public user$: Observable<User>;

  constructor(private readonly userService: UserService) {}

  // End open close
  ngOnInit() {
    this.user$ = this.userService.getObservable().pipe(
      filter((user: User[]) => !!user),
      map((user: User[]) => user[0])
    );

    this.sidebarnavItems = ROUTES_MENU.filter(
      (sidebarnavItem) => sidebarnavItem
    );
  }

  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = "0";
    } else {
      this.showMenu = element;
    }
  }
}
