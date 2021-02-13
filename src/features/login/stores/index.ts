import { version, ignore } from "mobx-sync"
import { action, observable, extendObservable, runInAction } from "mobx"
import SessionStore from "mobx-session"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class LoginStore {
  @ignore @observable inputLogin?: Models.ILogin
  @observable login?: Models.ILogin
  @observable loginFailedCount?: number

  constructor() {
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

  @action updateInputUser(user: Models.ILogin) {
    this.inputLogin = user
  }

  @action updateLogin(login: Models.ILogin) {
    this.login = login
  }

  @action updateLoginFailedCount(val: number) {
    this.loginFailedCount = val
  }
}

export default LoginStore
