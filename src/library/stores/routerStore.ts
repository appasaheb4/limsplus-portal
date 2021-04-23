import { makeAutoObservable, action, observable } from "mobx"
import { ignore, version } from "mobx-sync"
import * as LibraryModels from "../models"

@version(1.0)
class RouterStore {
  @observable userRouter?: any[]
  @observable selectedUserCategory?: LibraryModels.SelectedCategory
  @ignore @observable userPermission: any[] = []
  @ignore @observable selectedCategory?: LibraryModels.SelectedCategory
  @ignore @observable router?: any
  
  constructor() {
    makeAutoObservable(this)
  }

  @action updateUserRouter(router) {
    this.userRouter = router
  }

  @action updateRouter(router: any) {
    this.router = router
  }

  @action updateUserPermission(permission: any) {
    this.userPermission = permission
  }

  @action updateSelectedCategory(category?: LibraryModels.SelectedCategory) {
    this.selectedUserCategory = category
    this.selectedCategory = category
  }
}
export default RouterStore
