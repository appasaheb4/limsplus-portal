import { ignore, version } from "mobx-sync";
import { action, observable } from "mobx";
import * as Models from "../models";
import * as Services from "@lp/features/login/services";

@version(0.1)
class LoginStore {
  @observable inputLogin: Models.Login;
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

  @action updateInputUser(user: Models.Login) {
    this.inputLogin = user;
  }

  @action clear() {
    this.inputLogin = this.initUser();
  }
}

export default LoginStore;
