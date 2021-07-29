import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import moment from "moment"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
class UsersStore {
  @ignore @observable user!: Models.Users
  @observable userList?: Models.Users[]
  @ignore @observable changePassword?: Models.ChangePassword
  @ignore @observable checkExitsUserId: boolean = false
  @ignore @observable checkExistsEmpCode: boolean = false

  constructor() {
    let date: Date = new Date()
    date = new Date(moment(date).add(30, "days").format("YYYY-MM-DD HH:mm:ss"))

    this.user = {
      ...this.user,
      exipreDate: LibraryUtils.moment(date).unix(),
      exipreDays: 30,
      dateOfEntry: LibraryUtils.moment(new Date()).unix(),
      dateOfBirth: LibraryUtils.moment(
        new Date(moment(date).add(-30, "years").format("YYYY-MM-DD HH:mm:ss"))
      ).unix(),
      marriageAnniversary: LibraryUtils.moment(
        new Date(moment(date).add(-5, "years").format("YYYY-MM-DD HH:mm:ss"))
      ).unix(),
      confidential: false,
    }
    makeAutoObservable(this)
  }

  @computed get UsersService() {
    return new Services.UserService()
  }

  @action loadUser() {
    this.UsersService.userList().then((user) => {
      this.userList = user
    })
  }

  @action updateUser(user: Models.Users) {
    this.user = user
  }

  @action updateChangePassword(password: Models.ChangePassword) {
    this.changePassword = password
  }

  @action setExitsUserId(status: boolean) {
    this.checkExitsUserId = status
  }

  @action setExistsEmpCodeStatus(status: boolean) {
    this.checkExistsEmpCode = status
  }
}

export default UsersStore
