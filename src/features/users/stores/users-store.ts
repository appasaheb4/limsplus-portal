import { ignore, version } from "mobx-sync";
import { action, observable } from "mobx";
import * as Models from "../models";
import * as LibraryUtils from "@lp/library/utils";

@version(0.1)
class UsersStore {
  @ignore @observable user: Models.Users;
  constructor() {
    this.user = this.initUser();
  }

  private initUser() {
    return {
      userId: LibraryUtils.uuidv4(),
      lab: "",
      password: "",
      deginisation: "",
      status: "Active",
      fullName: "",
      department: "",
      exipreDate: new Date().toString(),
      role: "",
    };
  }

  @action updateUser(user: Models.Users) {
    this.user = user;
  }

  @action clear() {
    this.user = this.initUser();
  }
}

export default UsersStore;
