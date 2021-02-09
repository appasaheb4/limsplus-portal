import { version, ignore } from "mobx-sync"
import { action, observable, extendObservable, runInAction } from "mobx"
import SessionStore from "mobx-session"
import * as Models from "../models"
import moment from "moment"
import * as Services from "../services"

@version(0.1)
class UsersStore {
  @ignore @observable inputLogin: Models.Login
  @observable login?: Models.Login
  @ignore @observable user: Models.Users
  @observable userList?: Models.Users[]
  @ignore @observable changePassword?: Models.ChangePassword

  @observable checkExitsUserId: boolean = false

  constructor() {
    this.user = this.initUser()
    this.inputLogin = this.initLogin()

    SessionStore.initialize({ name: "limsplus" })
    extendObservable(this, {
      login: null,
      loginError: false,
      logoutError: false,
      get loggedIn() {
        return this.login !== null && SessionStore.hasSession
      },
    })
    runInAction("Load user", async () => {
      this.login = await SessionStore.getSession()
      console.log({ login: this.login })
    })
  }

  // session
  @action saveLogin = (session) => {
    SessionStore.saveSession(session)
    runInAction("Save user", () => {
      this.login = session
    })
  }
  @action removeUser = (): Promise<boolean> => {
    return new Promise<any>((resolve) => {
      if (SessionStore.hasSession) {
        Services.logout(this.login?.loginActivityId || "").then((res) => {
          if (res.status === 200) {
            SessionStore.deleteSession()
            runInAction("Logout user", () => {
              this.login = undefined
            })
            resolve(true)
          }
        })
      }
    })
  }

  private initLogin() {
    return {
      lab: "",
      role: "",
      userId: "",
      password: "",
    }
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

  @action updateInputUser(user: Models.Login) {
    this.inputLogin = user
  }
  @action updateLogin(userInfo: Models.Login) {
    this.login = userInfo
  }

  @action clearLogin() {
    this.login = undefined
  }

  @action clearInputLogin() {
    this.inputLogin = this.initLogin()
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
