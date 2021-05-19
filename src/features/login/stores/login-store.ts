import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, runInAction, computed } from "mobx"
import Session from "@lp/library/modules/session"
import * as Models from "../models"
import * as Services from "../services"

import { Stores } from "@lp/features/login/stores"
import { Stores as RootStore } from "@lp/library/stores"
import Storage from "@lp/library/modules/storage"

@version(0.1)
class LoginStore {
  @ignore @observable inputLogin?: Models.ILogin
  @observable login?: Models.ILogin
  @observable loginFailedCount?: number
  @ignore @observable forgotPassword?: Models.ForgotPassword

  constructor() {
    makeAutoObservable(this)
    Session.initialize("limsplus")
    runInAction(async () => {
      const session = await Session.getSession()
      RootStore.rootStore.updateSesssion(session)
    })
  }

  @computed get LoginService() {
    return new Services.LoginService(Stores.loginStore.login?.token as string)
  }

  @action saveLogin = async (session) => {
    Session.saveSession(session)
    this.login = session
  }

  @action removeUser = (): Promise<boolean> => {
    return new Promise<any>((resolve) => {
      if (Session.hasSession) {
        this.LoginService.logout({
          id: this.login?.loginActivityId,
          userId: this.login?._id,
        }).then(async (res) => {
          if (res.status === 200) {
            await Storage.removeItem(
              `__persist_mobx_stores_loginStore_${RootStore.rootStore.session.lastUpdated}_`
            )
            await Storage.removeItem(
              `__persist_mobx_stores_routerStore_${RootStore.rootStore.session.lastUpdated}_`
            )
            await Storage.removeItem(
              `__persist_mobx_stores_routerStore_SelectedCategory_${RootStore.rootStore.session.lastUpdated}_`
            )
            Session.deleteSession()
            RootStore.routerStore.updateUserRouter(undefined)
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
