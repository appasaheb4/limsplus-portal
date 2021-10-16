import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import moment from "moment"
import { UserService } from "../services"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
export class UserStore {
  @ignore @observable user!: Models.Users
   @observable userList?: Models.Users[] = []
   @observable userListCount: number = 0
   @ignore @observable changePassword!: Models.ChangePassword 
   @ignore @observable checkExitsUserId: boolean = false
   @ignore @observable checkExistsEmpCode: boolean = false
   
  constructor() {
   makeAutoObservable(this)
   let date: Date = new Date()
    date = new Date(moment(date).add(30, "days").format("YYYY-MM-DD HH:mm:ss"))
    this.user = new Models.Users({
      ...this.user,
      exipreDate: LibraryUtils.moment(date).unix(),
      expireDays: 30,
      dateOfEntry: LibraryUtils.moment(new Date()).unix(),
      dateOfBirth: LibraryUtils.moment(
        new Date(moment(date).add(-30, "years").format("YYYY-MM-DD HH:mm:ss"))
      ).unix(),
      marriageAnniversary: LibraryUtils.moment(
        new Date(moment(date).add(-5, "years").format("YYYY-MM-DD HH:mm:ss"))
      ).unix(),
      confidential: false,
      confirguration: false,
    })
  }

  @computed get UsersService() {
    return new UserService()
  }

  @action loadUser(page?, limit?) {
    this.UsersService.userList(page, limit);
  }

  @action updateUserList(res: any){
    if (!res.users.success) alert(res.users.message)
    this.userList = res.users.data
    this.userListCount = res.users.paginatorInfo.count
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
