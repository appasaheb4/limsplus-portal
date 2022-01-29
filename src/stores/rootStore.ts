import { makeObservable, action, observable } from "mobx"
import Session from "@lp/library/modules/session"
import { stores } from "@lp/stores"

export class RootStore {
  processLoading: boolean
  session!: any
   
  //modals
  modalTokenExpire!: any
  constructor() {
    this.processLoading = false
    makeObservable<RootStore, any>(this, {
      processLoading: observable,
      session: observable,
      modalTokenExpire: observable,

      setProcessLoading: action,
      isLogin: action,
      updateSesssion: action,
      updateModalTokenExpire: action,
    })
  }
  
  setProcessLoading(processLoading: boolean) {
    this.processLoading = processLoading
  }

  isLogin(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      await Session.getSession()
      try {
        if (Session.initialized) {
          if (Session.hasSession && stores.loginStore.login) {
            resolve(true)
          }
          resolve(false)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  updateSesssion(value: any) {
    this.session = value
  }

  // modals actions
  updateModalTokenExpire(details: any) {
    this.modalTokenExpire = details
  }

}
