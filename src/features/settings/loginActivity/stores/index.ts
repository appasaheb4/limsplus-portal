import { version } from "mobx-sync"
import { action, observable } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class LoginActivityStore {
  @observable listLoginActivity?: Models.ILoginActivity[] = []

  @action fetchLoginActivity() {
    Services.listLoginActivity().then((list) => {
      // console.log({ rolMapping: list })
      this.listLoginActivity = list
    })
  }
}
export default LoginActivityStore
