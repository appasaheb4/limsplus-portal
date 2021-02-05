import { version, ignore } from "mobx-sync"
import { action, observable } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class RoleMappingStore {
  @ignore @observable role?: Models.IRoleMapping
  @observable roleMappingList?: Models.IRoleMapping[] = []
  @observable arrSelectedRole?: any[] = []

  @action fetchRoleMappingList() {
    Services.roleMappingList().then((list) => {
      this.roleMappingList = list
    })
  }

  @action updateRole = (roles: any) => {
    this.arrSelectedRole = roles
  }
}
export default RoleMappingStore
