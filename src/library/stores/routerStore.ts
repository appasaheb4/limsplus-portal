import { action, observable } from "mobx"
import { ignore, version } from "mobx-sync"

@version(1.0)
class RouterStore {
  @observable userRouter?: any[]
  @observable userPermission: any[] =[]
  @ignore @observable router?: any

  @action updateUserRouter(router) {
    this.userRouter = router
  }
  @action updateRouter(router: any) {
    this.router = router
  }
  @action updateUserPermission(permission: any){
    this.userPermission = permission;
  }
}
//const rootStore = new RootStore()
export default RouterStore
