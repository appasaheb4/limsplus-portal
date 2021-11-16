import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
export class RoleStore {
  @observable listRole: Models.Role[] = []
  @observable listRoleCount: number = 0
  @ignore @observable role?: Models.Role
  @ignore @observable checkExitsCode?: boolean = false

  constructor() {
    makeObservable<RoleStore, any>(this, {
      listRole: observable,
      listRoleCount: observable,
      role: observable,
      checkExitsCode: observable,
    })
  }

  @computed get RoleService() {
    return new Services.RoleService()
  }

  @action fetchListRole(page?, limit?) {
    this.RoleService.listRole(page, limit)
  }

  @action updateRoleList(res: any) {
    if (!res.roles.success) return alert(res.roles.message)
    this.listRole = res.roles.data
    this.listRoleCount = res.roles.paginatorInfo.count
  }

  @action setExitsCode(status: boolean) {
    this.checkExitsCode = status
  }

  @action updateRole = (role: Models.Role) => {
    this.role = role
  }

}
