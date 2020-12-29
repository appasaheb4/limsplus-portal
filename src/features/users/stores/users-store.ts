import { ignore, version } from "mobx-sync";
import { action, observable } from "mobx";
import * as Models from "../models";

@version(0.1)
class UsersStore {
  @observable inputLogin: Models.Users;
  constructor() {
    this.inputLogin = this.initUser();
  }

  private initUser() {
    return {
      lab: "",
      userId: "",
      password: "",
    };
  }

  @action updateInputUser(user: Models.Users) {
    this.inputLogin = user;
  }

  @action clear() {
    this.inputLogin = this.initUser();
  }
}

export default UsersStore;
