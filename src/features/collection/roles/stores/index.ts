import { version, ignore } from "mobx-sync";
import { action, observable } from "mobx";
import * as Models from "../models";
import * as Services from "../services";

@version(0.1)
class RoleStore {
  @observable listRole: Models.IRole[] = [];

  fetchListRole() {
    Services.listRole().then((res) => {
      console.log({ role: res });
      this.listRole = res;
    });
  }
}

export default RoleStore;
