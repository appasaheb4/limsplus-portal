import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, runInAction, computed } from "mobx"
import Session from "@lp/library/modules/session"
import { Login, ForgotPassword } from "../models"
import * as Services from "../services"
import { stores } from "@lp/stores"
import Storage from "@lp/library/modules/storage"

@version(0.1)
export class LoginStore {
  @ignore @observable inputLogin!: Login
  @observable login!: Login
  @observable loginFailedCount?: number
  @ignore @observable forgotPassword!: ForgotPassword

  constructor() {
    makeAutoObservable(this)
    Session.initialize({ name: "limsplus" })
    runInAction(async () => {
      const session = await Session.getSession()
      if (session) {
        if (stores) stores.rootStore.updateSesssion(session)
        this.login = session
      }
    })
  }

  @computed get LoginService() {
    return new Services.LoginService()
  }

  @action saveLogin = async (session) => {
    localStorage.setItem("accessToken", session.accessToken)
    Session.saveSession(session)
    stores.updateLoginStore()
    this.login = session
  }

  @action removeUser = (): Promise<any> => {
    return new Promise<any>((resolve) => {
      if (Session.hasSession) {
        this.LoginService.logout({
          input: {
            loginActivityId: this.login?.loginActivityId,
            _id: this.login?._id,
            accessToken: this.login?.accessToken,
          },
        }).then(async (res) => {
          if (res.logout.success) {  
            await Storage.removeItem(`__persist_mobx_stores_loginStore__`)
            await Storage.removeItem(`__persist_mobx_stores_routerStore__`)
            await Storage.removeItem(
              `__persist_mobx_stores_routerStore_SelectedCategory__`
            )
            Session.deleteSession()
            stores.routerStore.updateUserRouter(undefined)
            runInAction(() => {
              this.login = new Login({})
            })
            resolve(res)
          } else {
            alert(res.logout.message)
          }
        })
      }
    })
  }

  @action removeLocalSession = (): Promise<boolean> => {
    return new Promise<boolean>(async (resolve) => {
      await Storage.removeItem(`__persist_mobx_stores_loginStore__`)
      await Storage.removeItem(`__persist_mobx_stores_routerStore__`)
      await Storage.removeItem(
        `__persist_mobx_stores_routerStore_SelectedCategory__`
      )
      Session.deleteSession()
      stores.routerStore.updateUserRouter(undefined)
      runInAction(() => {
        this.login = new Login({})
      })
      resolve(true)
    })
  }

  @action updateInputUser(user: Login) {
    this.inputLogin = user
  }

  @action clearInputUser() {
    this.inputLogin = new Login({})
  }

  @action updateLogin = (login: Login) => {
    this.login = login
  }

  @action updateLoginFailedCount(val: number) {
    this.loginFailedCount = val
  }
  @action updateForgotPassword(details?: ForgotPassword | undefined) {
    if (details) this.forgotPassword = details
    else this.forgotPassword = new ForgotPassword({})
  }
}
