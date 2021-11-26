import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import dayjs from "dayjs"
import { UserService } from "../services"

export class UserStore {
  user!: Models.Users
  userList!: Models.Users[]
  userFilterList!: Models.Users[]
  userListCount: number = 0
  changePassword!: Models.ChangePassword
  checkExitsUserId: boolean
  checkExistsEmpCode: boolean

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
      systemInfo: {
        accessInfo: {
          mobile: true,
          desktop: true,
        },
      },
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

      UsersService: computed,
      loadUser: action,
      updateUserList: action,
      updateUser: action,
      updateChangePassword: action,
      setExitsUserId: action,
      setExistsEmpCodeStatus: action,
      updateUserFilterList: action,
      filterUserList: action
    })
  }

  get UsersService() {
    return new UserService()
  }

  loadUser(page?, limit?) {
    this.UsersService.userList(page, limit)
  }

  updateUserList(res: any) {
    if (!res.users.success) alert(res.users.message)
    this.userList = res.users.data
    this.userFilterList = res.users.data
    this.userListCount = res.users.paginatorInfo.count
  }
  
  filterUserList(res: any) {
    this.userList = res.filterUsers.data
    this.userListCount = res.filterUsers.paginatorInfo.count
  }

  updateUser(user: Models.Users) {
    this.user = user
  }

  updateChangePassword(password: Models.ChangePassword) {
    this.changePassword = password
  }

  setExitsUserId(status: boolean) {
    this.checkExitsUserId = status
  }

  setExistsEmpCodeStatus(status: boolean) {
    this.checkExistsEmpCode = status
  }

  updateUserFilterList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.usersFilterByKey.success) alert(res.usersFilterByKey.message)
      this.userFilterList = res.usersFilterByKey.data
    } else {
      this.userFilterList = res
    }
  }
}
