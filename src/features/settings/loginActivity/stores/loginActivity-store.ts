import { version } from "mobx-sync"
import { makeAutoObservable, action, observable } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class LoginActivityStore {
  @observable listLoginActivity?: Models.ILoginActivity[] = []
  constructor() {
    makeAutoObservable(this)
  }

  @action fetchLoginActivity() {
    Services.listLoginActivity().then((list) => {
      // console.log({ rolMapping: list })
      this.listLoginActivity = list
    })
  }
}  
export default LoginActivityStore
