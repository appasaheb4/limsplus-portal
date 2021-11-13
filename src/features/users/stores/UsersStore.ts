import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import dayjs from "dayjs"
import { UserService } from "../services"

@version(0.1)
export class UserStore {
  @ignore @observable user!: Models.Users
  @observable userList!: Models.Users[]
  @ignore userFilterList!: Models.Users[]
  @observable userListCount: number = 0
  @ignore @observable changePassword!: Models.ChangePassword
  @ignore @observable checkExitsUserId: boolean
  @ignore @observable checkExistsEmpCode: boolean

  constructor() {
    this.userList = []
    this.userFilterList = []
    this.checkExitsUserId = false
    this.checkExistsEmpCode = false
    this.user = new Models.Users({
      ...this.user,
      exipreDate: dayjs(new Date()).add(30, "days").format("YYYY-MM-DD"),
      expireDays: 30,
      dateOfEntry: new Date(),
      dateOfBirth: dayjs(new Date()).add(-30, "years").format("YYYY-MM-DD"),
      marriageAnniversary: dayjs(new Date())
        .add(-5, "years")
        .format("YYYY-MM-DD HH:mm:ss"),
      confidential: false,
      confirguration: false,
      validationLevel: 0,
    })
    makeObservable<UserStore, any>(this, {
      user: observable,
      userList: observable,
      userListCount: observable,
      changePassword: observable,
      checkExitsUserId: observable,
      checkExistsEmpCode: observable,
      userFilterList: observable,
    })
  }

  @computed get UsersService() {
    return new UserService()
  }

  @action loadUser(page?, limit?) {
    this.UsersService.userList(page, limit)
  }

  @action updateUserList(res: any) {
    if (!res.users.success) alert(res.users.message)
    this.userList = res.users.data
    this.userFilterList = res.users.data
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

  @action updateUserFilterList(res: any){
    if(!Array.isArray(res)){
      if (!res.usersFilterByKey.success) alert(res.usersFilterByKey.message)
      this.userFilterList = res.usersFilterByKey.data
    }else{
      this.userFilterList = res
    }
    
  }
}
