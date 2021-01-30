import { version, ignore } from "mobx-sync"
import { action, observable } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class UserMappingStore {
  @ignore @observable user?: Models.User

  @action updateUser = (user: Models.User) => {
    this.user = user
  }
}
export default UserMappingStore
