import { Injectable } from "@angular/core";
import { DatabaseService } from "../db.service";
import { User } from "@interfaces/user.interface";
import { Table, liveQuery, Observable } from "dexie";
import { clone } from "@common/functions";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  private get user(): Table<User, number> {
    return this.db.getUser();
  }

  public async getById(id: number): Promise<User> {
    return await this.user.get(parseFloat(id.toString()));
  }

  public async update(user: User): Promise<void> {
    if (user?.id) await this.user.update(user.id, user);
    else await this.user.add(user);
  }
}
