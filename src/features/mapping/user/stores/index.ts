import { version, ignore } from "mobx-sync"
import { action, observable } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class UserMappingStore {
  @ignore @observable user?: Models.User
  @observable userMappingList?: Models.User[] = []
  @observable arrPages?: any[] = []
  @observable arrUserPermision?: [] = []

  @action fetchUserMappingList() {
    Services.userMappingList().then((list) => {
      console.log({ userMappinglist: list })
      this.userMappingList = list
    })
  }

  @action updateUser = (user: Models.User) => {
    this.user = user
  }

  @action updatePages(pages: any) {
    this.arrPages = pages
  }

  @action updateUserPermision(permission: any) {
    this.arrUserPermision = permission
  }
}
export default UserMappingStore
