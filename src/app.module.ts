import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CcxtService } from "./services/ccxt.service";
import { ExchangeResponseInterpreter } from "./services/exchange-response-interpreter.service";
import { CcxtController } from "./controllers/ccxt/ccxt.controller";
import { ScheduleModule } from "@nestjs/schedule";
import { AccountService } from "./services/account.service";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "p4rz1v4l",
      password: "be_rich_or_be_poor",
      database: "p4rz1v4l",
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController, CcxtController],
  providers: [
    AppService,
    CcxtService,
    AccountService,
    ExchangeResponseInterpreter,
  ],
})
export class AppModule {}
