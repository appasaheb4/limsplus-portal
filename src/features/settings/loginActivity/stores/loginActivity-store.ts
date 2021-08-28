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
   
  @action fetchLoginActivity(page?,limit=10) {
    this.LoginActivityService.listLoginActivity(page,limit).then((res) => {
      console.log({res});
      
      this.listLoginActivity = res.data.loginActivity  
      this.listLoginActivityCount = res.data.count
    })
  }
}
export default LoginActivityStore
