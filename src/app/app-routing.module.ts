import { NgModule } from "@angular/core";
import { RouterModule, Routes, RouteReuseStrategy } from "@angular/router";
import { FullComponent } from "./layouts/full/full.component";
import { CustomRouterReuseStrategy } from "./shared/routes/custom-router-reused";

const routes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      { path: "", redirectTo: "/dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "home",
        loadChildren: () =>
          import("./pages/home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "about",
        loadChildren: () =>
          import("./pages/about/about.module").then((m) => m.AboutModule),
      },
      {
        path: "account",
        loadChildren: () =>
          import("./pages/account/account.module").then((m) => m.AccountModule),
      },
      {
        path: "backtest",
        loadChildren: () =>
          import("./pages/backtest/backtest.module").then(
            (m) => m.BacktestModule
          ),
      },
      {
        path: "genetic-algorithms",
        loadChildren: () =>
          import("./pages/genetic-algorithms/genetic-algorithms.module").then(
            (m) => m.GeneticAlgorithmsModule
          ),
      },
      {
        path: "strategies",
        loadChildren: () =>
          import("./pages/strategies/strategies.module").then(
            (m) => m.StrategiesModule
          ),
      },
      {
        path: "bots",
        loadChildren: () =>
          import("./pages/bots/bot-list/bots.module").then(
            (m) => m.BotsRoutingModule
          ),
      },
      {
        path: "bot",
        loadChildren: () =>
          import("./pages/bots/bot-details/bot-detail.module").then(
            (m) => m.BotDetailsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouterReuseStrategy,
    },
  ],
})
export class AppRoutingModule {}
