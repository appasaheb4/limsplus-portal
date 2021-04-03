import { action, observable } from "mobx"
import { version, ignore } from "mobx-sync"
import SessionStore from "mobx-session"

@version(1.0)
class RootStore {
  @ignore @observable processLoading: boolean = false
  
  @action setProcessLoading(processLoading: boolean) {
  //  console.log({processLoading});
    this.processLoading = processLoading
  }
  @action isLogin(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        if (SessionStore.initialized) {
          if (SessionStore.hasSession) {
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
//const rootStore = new RootStore()
export default RootStore
