import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
export class RoleMappingStore {
  @ignore @observable user!: Models.Role
  @ignore @observable selectedRole!: Models.RoleMapping
  @observable roleMappingList: Models.Role[]
  @observable roleMappingListCount: number
  @observable rolePermission: any
  constructor() {
    this.roleMappingList = []
    this.roleMappingListCount = 0

    makeObservable<RoleMappingStore, any>(this, {
      user: observable,
      selectedRole: observable,
      roleMappingList: observable,
      roleMappingListCount: observable,
      rolePermission: observable,
    })
  }

  @computed get roleMappingService() {
    return new Services.RoleMappingService()
  }

  @action fetchRoleMappingList(page?, limit?) {
    this.roleMappingService.roleMappingList(page, limit)
  }

  @action updateRoleMappingList(res: any) {
    if (!res.roleMappings.success) return alert(res.roleMappings.message)
    this.roleMappingList = res.roleMappings.data
    this.roleMappingListCount = res.roleMappings.paginatorInfo.count
  }

  @action updateUser = (user: Models.Role) => {
    this.user = user
  }

  @action updateRolePermission(permission: any) {
    this.rolePermission = permission  
  }
  @action updateSelectedRole(role: Models.RoleMapping) {
    this.selectedRole = role
  }
}
