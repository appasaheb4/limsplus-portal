import { version, ignore } from "mobx-sync"
import { action, observable } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class RoleMappingStore {
  @ignore @observable user?: Models.IRole
  @observable roleMappingList?: Models.IRole[] = []
  @observable rolePermission?: any

  @action fetchRoleMappingList() {
    Services.roleMappingList().then((list) => {
      this.roleMappingList = list
    })
  }

  @action updateUser = (user: Models.IRole) => {
    this.user = user
  }

  @action updateRolePermission(permission: any) {
    this.rolePermission = permission
  }
}
export default RoleMappingStore
