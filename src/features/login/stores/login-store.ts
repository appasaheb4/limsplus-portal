import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, runInAction, computed } from "mobx"
import Session from "@lp/library/modules/session"
import Storage from "@lp/library/modules/storage"
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
    makeAutoObservable(this)
    Session.initialize("limsplus")
    Storage.getItem("__persist_mobx_stores_loginStore__").then((login: any) => {
      login = JSON.parse(login)
      if (login.login) {
        runInAction(async () => {
          await Session.getSession(login.login.userId)
        })
      }
    })
  }

  @computed get LoginService() {
    return new Services.LoginService(Stores.loginStore.login?.token as string)
  }
   
  @action saveLogin = (session) => {
    Session.saveSession(session.userId, session)
    this.login = session
  }

  @action removeUser = (): Promise<boolean> => {
    return new Promise<any>((resolve) => {
      if (Session.hasSession) {
        Services.logout(this.login?.loginActivityId || "").then(async (res) => {
          if (res.status === 200) {
            await localStorage.removeItem(`__persist_mobx_stores_loginStore__`)
            await localStorage.removeItem(`__persist_mobx_stores_routerStore__`)
            await localStorage.removeItem(
              `__persist_mobx_stores_routerStore_SelectedCategory__`
            )
            Session.deleteSession(this.login?.userId)
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

  @action updateLogin = (login: any) => {
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
