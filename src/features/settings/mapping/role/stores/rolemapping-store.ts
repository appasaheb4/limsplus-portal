import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class RoleMappingStore {
  @ignore @observable user?: Models.IRole
  @observable roleMappingList?: Models.IRole[] = []
  @observable rolePermission?: any
  constructor() {
    makeAutoObservable(this)
  }

  @action fetchRoleMappingList() {
    Services.roleMappingList().then((list) => {
      this.roleMappingList = list
    })
  }

  @computed get roleMappingService() {
    return new Services.RoleMappingService()
  }

  @action updateUser = (user: Models.IRole) => {
    this.user = user
  }

  @action updateRolePermission(permission: any) {
    this.rolePermission = permission
  }
}
export default RoleMappingStore
