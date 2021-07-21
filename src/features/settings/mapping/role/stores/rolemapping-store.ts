import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class RoleMappingStore {
  @ignore @observable user?: Models.IRole
  @ignore @observable selectedRole?: Models.RoleMapping
  @observable roleMappingList?: Models.IRole[] = []
  @observable rolePermission?: any
  constructor() {
    makeAutoObservable(this)
  }

  @computed get roleMappingService() {
    return new Services.RoleMappingService(
    )
  }

  @action fetchRoleMappingList() {
    this.roleMappingService.roleMappingList().then((list) => {
      this.roleMappingList = list
    })
  }

  @action updateUser = (user: Models.IRole) => {
    this.user = user
  }

  @action updateRolePermission(permission: any) {
    this.rolePermission = permission
  }
  @action updateSelectedRole(role: Models.RoleMapping) {
    this.selectedRole = role
  }
}
export default RoleMappingStore
