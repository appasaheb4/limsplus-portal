import { makeObservable, action, observable } from "mobx"
import { version, ignore } from "mobx-sync"
import Session from "@lp/library/modules/session"
//import { stores } from "@lp/stores"

@version(1.0)
export class RootStore {
  @ignore @observable processLoading: boolean
  @ignore @observable session!: any

  //modals
  @ignore @observable modalTokenExpire!: any
  constructor() {
    this.processLoading = false
    makeObservable<RootStore, any>(this, {
      processLoading: observable,
      session: observable,
      modalTokenExpire: observable,
    })
  }

  @action setProcessLoading(processLoading: boolean) {
    this.processLoading = processLoading
  }
  @action isLogin(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      await Session.getSession()
      try {
        if (Session.initialized) {
          if (Session.hasSession && this.session) {
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
