import { Injectable } from "@angular/core";
import { DatabaseService } from "../db.service";
import { User } from "@interfaces/user.interface";
import { Table } from "dexie";
import { CryptoService } from "@services/cryptography/crypto.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({ providedIn: "root" })
export class UserService {
  public currentUser: User;

  constructor(
    private readonly db: DatabaseService,
    private readonly cryptoService: CryptoService,
    private readonly lsService: LocalStorageService
  ) {}

  private get user(): Table<User, number> {
    return this.db.getUser();
  }

  public async getById(id: number): Promise<User> {
    const key: string = this.lsService.get<string>("AppRandomKey");
    const user: User = await this.user.get(parseFloat(id.toString()));

    if (user?.pass) user.pass = this.cryptoService.decrypt(key, user.pass);
    if (user?.secretKey)
      user.secretKey = this.cryptoService.decrypt(key, user.secretKey);
    if (user?.apiKey)
      user.apiKey = this.cryptoService.decrypt(key, user.apiKey);

    return user;
  }

  public async update(user: User): Promise<void> {
    const key: string = this.lsService.get<string>("AppRandomKey");

    if (user?.pass) user.pass = this.cryptoService.encrypt(key, user.pass);
    if (user?.secretKey)
      user.secretKey = this.cryptoService.encrypt(key, user.secretKey);
    if (user?.apiKey)
      user.apiKey = this.cryptoService.encrypt(key, user.apiKey);

    if (user?.id) await this.user.update(user.id, user);
    else await this.user.add(user);
  }
}
