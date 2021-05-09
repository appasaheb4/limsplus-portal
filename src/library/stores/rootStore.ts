import { makeAutoObservable, action, observable, toJS } from "mobx"
import { version, ignore } from "mobx-sync"
import Session from "@lp/library/modules/session"

@version(1.0)
class RootStore {
  @ignore @observable processLoading: boolean = false
  constructor() {
    makeAutoObservable(this)
  }

  @action setProcessLoading(processLoading: boolean) {
    //  console.log({processLoading});
    this.processLoading = processLoading
  }
  @action isLogin(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        console.log({Session});
        if (Session.initialized) {
          if (Session.hasSession) {
            resolve(true)
          }
          resolve(false)
        }
      } catch (error) {
        reject(error)
      }
    })
  }
}
export default RootStore
