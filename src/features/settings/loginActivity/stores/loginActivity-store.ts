import { version } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
@version(0.1)
class LoginActivityStore {
  @observable listLoginActivity?: Models.LoginActivity[] = []
  @observable listLoginActivityCount?: number = 0
  constructor() {
    makeAutoObservable(this)
  }

  @computed get LoginActivityService() {
    return new Services.LoginActivityService()
  }
   
  @action fetchLoginActivity(limit=10) {
    this.LoginActivityService.listLoginActivity(limit).then((list) => {
      this.listLoginActivity = list.data.loginActivity  
      this.listLoginActivityCount = list.data.count
    })
  }
}
export default LoginActivityStore
