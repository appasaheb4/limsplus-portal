import { makeAutoObservable, action, observable } from "mobx"
import { version, ignore } from "mobx-sync"
//import SessionStore from "mobx-session"

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
    return new Promise<boolean>((resolve, reject) => {
      try {
        // if (SessionStore.initialized) {
        //   if (SessionStore.hasSession) {
        //     resolve(true)
        //   }
        //   resolve(false)
        // }
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}
export default RootStore
