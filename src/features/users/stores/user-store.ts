import { version, ignore } from "mobx-sync"
import { action, observable } from "mobx"
import * as Models from "../models"
import moment from "moment"
import * as Services from "../services"

@version(0.1)
class UsersStore {
  @ignore @observable user: Models.Users
  @observable userList?: Models.Users[]
  @ignore @observable changePassword?: Models.ChangePassword
  @ignore @observable checkExitsUserId: boolean = false

  constructor() {
    this.user = this.initUser()
  }

  private initUser() {
    let date: Date = new Date()
    date = new Date(moment(date).add(30, "days").format("YYYY-MM-DD HH:mm:ss"))
    return {
      userId: "",
      lab: [],
      password: "",
      deginisation: "",
      status: "Active",
      fullName: "",
      mobileNo: "",
      email: "",
      department: [],
      exipreDate: new Date(date),
      exipreDays: 30,
      role: [],
    }
  }

  @action loadUser() {
    Services.userList().then((user) => {
      //console.log({ user })
      this.userList = user
    })
  }

  @action updateUser(user: Models.Users) {
    this.user = user
  }

  @action updateChangePassword(password: Models.ChangePassword) {
    this.changePassword = password
  }

  @action clear() {
    this.user = this.initUser()
  }

  @action setExitsUserId(status: boolean) {
    this.checkExitsUserId = status
  }
}

export default UsersStore
