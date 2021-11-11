import { version } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
@version(0.1)
export class LoginActivityStore {
  @observable listLoginActivity: Models.LoginActivity[]
  @observable listLoginActivityCount: number
  constructor() {
    this.listLoginActivity = []
    this.listLoginActivityCount = 0
    makeObservable<LoginActivityStore, any>(this, {
      listLoginActivity: observable,
      listLoginActivityCount: observable,
    })
  }

  @computed get LoginActivityService() {
    return new Services.LoginActivityService()
  }

  @action fetchLoginActivity(page?, limit?) {
    this.LoginActivityService.listLoginActivity(page, limit)
  }

  @action updateLoginActivityList(res: any) {
    console.log({res});
    
    if (!res.loginActivitys.success) return alert(res.loginActivitys.message)
    this.listLoginActivity = res.loginActivitys.data
    this.listLoginActivityCount = res.loginActivitys.paginatorInfo.count
  }
}
