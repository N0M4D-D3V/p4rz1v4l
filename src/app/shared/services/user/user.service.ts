import { Injectable } from "@angular/core";
import { User } from "@interfaces/user.interface";
import { AbstractObservableService } from "@services/abstract/abstract-observable.service";

@Injectable({ providedIn: "root" })
export class UserService extends AbstractObservableService<User> {

  constructor() {
    super();
  }
}
