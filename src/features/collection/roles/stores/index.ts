import { version, ignore } from "mobx-sync";
import { action, observable } from "mobx";
import * as Models from "../models";
import * as Services from "../services";

@version(0.1)
class RoleStore {
  @observable listRole: Models.IRole[] = [];
  @ignore @observable role?: Models.IRole;

  private init() {
    return {
      code: "",
      name: "",
    };
  }

  fetchListRole() {
    Services.listRole().then((res) => {
      console.log({ role: res });
      this.listRole = res;
    });
  }

  @action updateRole = (role: Models.IRole) => {
    this.role = role;
  };

  @action clear() {
    this.role = this.init();
  }
}

export default RoleStore;
