import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ROUTES_MENU } from "../interfaces/sidebar.interface";
import { RoutesMenu } from "../models/routes-sidebar.model";

@Injectable({
  providedIn: "root",
})
export class VerticalSidebarService {
  public screenWidth: any;
  public collapseSidebar: boolean = false;
  public fullScreen: boolean = false;

  MENUITEMS: RoutesMenu[] = ROUTES_MENU;

  items = new BehaviorSubject<RoutesMenu[]>(this.MENUITEMS);

  constructor() {}
}
