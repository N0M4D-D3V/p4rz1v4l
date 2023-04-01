export interface RoutesMenu {
    path: string;
    title: string;
    icon: string;
    class: string;
    extralink: boolean;
    submenu: RoutesMenu[];
  }