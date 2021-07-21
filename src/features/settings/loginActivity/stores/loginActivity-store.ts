import { version } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
@version(0.1)
class LoginActivityStore {
  @observable listLoginActivity?: Models.ILoginActivity[] = []
  constructor() {
    makeAutoObservable(this)
  }

  @computed get LoginActivityService() {
    return new Services.LoginActivityService(
    )
  }

  @action fetchLoginActivity() {
    this.LoginActivityService.listLoginActivity().then((list) => {
      // console.log({ rolMapping: list })
      this.listLoginActivity = list
    })
  }
}
export default LoginActivityStore
