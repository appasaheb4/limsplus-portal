import { version, ignore } from "mobx-sync";
import { action, observable } from "mobx";
import * as Models from "../models";
import * as LibraryUtils from "@lp/library/utils";
import moment from "moment";
import * as Services from "../services";

@version(0.1)
class UsersStore {
  @observable inputLogin: Models.Login;
  @ignore @observable user: Models.Users;
  @observable userList?: Models.Users[];
  @ignore @observable changePassword?: Models.ChangePassword;

  constructor() {
    this.user = this.initUser();
    this.inputLogin = this.initLogin();
  }
  private initLogin() {
    return {
      lab: "",
      userId: "",
      password: "",
    };
  }

  private initUser() {
    let date: Date = new Date();
    date = new Date(moment(date).add(30, "days").format("YYYY-MM-DD HH:mm:ss"));
    return {
      userId: LibraryUtils.uuidv4(),
      lab: "",
      password: "",
      deginisation: "",
      status: "Active",
      fullName: "",
      department: "",
      exipreDate: new Date(date),
      exipreDays: 30,
      role: "",
    };
  }

  @action updateInputUser(user: Models.Login) {
    console.log({ user });

    this.inputLogin = user;
  }

  @action clearLogin() {
    this.inputLogin = this.initLogin();
  }

  @action loadUser() {
    Services.Users.userList().then((user) => {
      console.log({ user });
      this.userList = user;
    });
  }

  @action updateUser(user: Models.Users) {
    this.user = user;
  }

  @action updateChangePassword(password: Models.ChangePassword) {
    this.changePassword = password;
  }

  @action clear() {
    this.user = this.initUser();
  }
}

export default UsersStore;
