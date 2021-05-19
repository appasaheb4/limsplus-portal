import { makeAutoObservable, action, observable } from "mobx"
import { version, ignore } from "mobx-sync"
import Session from "@lp/library/modules/session"

@version(1.0)
class RootStore {
  @ignore @observable processLoading: boolean = false
  @ignore @observable session?: any
  constructor() {
    makeAutoObservable(this)
  }

  @action setProcessLoading(processLoading: boolean) {
    this.processLoading = processLoading
  }
  @action isLogin(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        if (Session.initialized) {
          if (Session.hasSession === true) {
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
}
export default RootStore
