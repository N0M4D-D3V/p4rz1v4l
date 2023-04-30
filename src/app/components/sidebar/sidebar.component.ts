import { Component, OnInit } from "@angular/core";
import { ROUTES_MENU } from "./shared-sidebar/interfaces/sidebar.interface";
import { RoutesMenu } from "./shared-sidebar/models/routes-sidebar.model";
import { User } from "@interfaces/user.interface";
import { UserService } from "@core/database/services/user.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  showMenu = "";
  showSubMenu = "";
  public sidebarnavItems: RoutesMenu[] = [];
  public user: User;

  constructor(private readonly userService: UserService) {}

  // End open close
  async ngOnInit() {
    this.user = await this.userService.getById(1);

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
