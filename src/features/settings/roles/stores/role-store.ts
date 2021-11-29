import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

export class RoleStore {
  listRole: Models.Role[] = []
  listRoleCopy: Models.Role[] = []
  listRoleCount: number = 0
  role?: Models.Role
  checkExitsCode?: boolean = false

  constructor() {
    makeObservable<RoleStore, any>(this, {
      listRole: observable,
      listRoleCopy: observable,
      listRoleCount: observable,
      role: observable,
      checkExitsCode: observable,

      RoleService: computed,
      fetchListRole: action,
      updateRoleList: action,
      setExitsCode: action,
      updateRole: action,
    })
  }

  get RoleService() {
    return new Services.RoleService()
  }

  fetchListRole(page?, limit?) {
    this.RoleService.listRole(page, limit)
  }

  updateRoleList(res: any) {  
    if (!Array.isArray(res)) {
      if (!res.roles.success) return alert(res.roles.message)
      this.listRole = res.roles.data
      this.listRoleCopy = res.roles.data
      this.listRoleCount = res.roles.paginatorInfo.count
    } else {
      this.listRole = res
    }
  }

  filterRoleList(res: any) {
    this.listRole = res.filterRoles.data
    this.listRoleCount = res.filterRoles.paginatorInfo.count
  }

  setExitsCode(status: boolean) {
    this.checkExitsCode = status
  }

  updateRole = (role: Models.Role) => {
    this.role = role
  }
}
