import { action, observable } from "mobx"
import { version } from "mobx-sync"

@version(1.0)
class RouterStore {
  @observable userRouter?: any
  @observable router?: any
  
  @action updateUserRouter(router) {
    this.userRouter = router
  } 
  @action updateRouter(router: any) {
    this.router = router
  }  
}
//const rootStore = new RootStore()
export default RouterStore
