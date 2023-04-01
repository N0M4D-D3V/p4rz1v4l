import { RoutesMenu } from "../models/routes-sidebar.model";

export const ROUTES_MENU: RoutesMenu[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: "/home",
    title: "Home",
    icon: "bi bi-speedometer2",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/backtest",
    title: "Backtest",
    icon: "bi bi-bell",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/genetic-algorithms",
    title: "Genetic Algorithms",
    icon: "bi bi-patch-check",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/strategies",
    title: "Strategies",
    icon: "bi bi-hdd-stack",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/bots",
    title: "Bots",
    icon: "bi bi-card-text",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/account",
    title: "Account",
    icon: "bi bi-menu-app",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/about",
    title: "About",
    icon: "bi bi-pause-btn",
    class: "",
    extralink: false,
    submenu: [],
  },
];
