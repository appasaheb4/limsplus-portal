import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, runInAction, computed } from "mobx"
import SessionStore from "mobx-session"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
class LoginStore {
  @ignore @observable inputLogin?: Models.ILogin
  @observable login?: Models.ILogin
  @observable loginFailedCount?: number
  @ignore @observable forgotPassword?: Models.ForgotPassword

  constructor() {
    SessionStore.initialize({ name: "limsplus" })
    makeAutoObservable(this)
    // runInAction(async () => {
    //   this.login = await SessionStore.getSession()
    // })
  }

  @computed get LoginService() {
    return new Services.LoginService(Stores.loginStore.login?.token as string)
  }

  // session
  @action saveLogin = (session) => {
    SessionStore.saveSession(session)
    this.login = session
  }

  @action removeUser = (): Promise<boolean> => {
    return new Promise<any>((resolve) => {
      if (SessionStore.hasSession) {
        Services.logout(this.login?.loginActivityId || "").then((res) => {
          if (res.status === 200) {
            SessionStore.deleteSession()
            runInAction(() => {
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

  @action clearInputUser() {
    this.inputLogin = undefined
  }

  @action updateLogin(login: Models.ILogin) {
    this.login = login
  }

  @action updateLoginFailedCount(val: number) {
    this.loginFailedCount = val
  }
  @action updateForgotPassword(details?: Models.ForgotPassword | undefined) {
    this.forgotPassword = details
  }
}   

export default LoginStore
