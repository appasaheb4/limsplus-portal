import { makeAutoObservable, action, observable } from "mobx"
import { version, ignore } from "mobx-sync"
import Session from "@lp/library/modules/session"
import { Stores as LoginStore } from "@lp/features/login/stores"

@version(1.0)
class RootStore {
  @ignore @observable processLoading: boolean = false
  @ignore @observable session?: any

  //modals
  @ignore @observable modalTokenExpire?: any;
  constructor() {
    makeAutoObservable(this)
  }

  @action setProcessLoading(processLoading: boolean) {
    this.processLoading = processLoading
  }
  @action isLogin(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      await Session.getSession()
      try {
        if (Session.initialized) {
          if (Session.hasSession && LoginStore.loginStore.login) {
            resolve(true)
          }
          resolve(false)
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  @action updateSesssion(value: any) {
    this.session = value
  }

  // modals actions
  @action updateModalTokenExpire(details: any) {
    this.modalTokenExpire = details
  }
}
export default RootStore
