import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class RoleRightsMappingStore {
  @ignore @observable role?: Models.IRoleRightsMapping
  @observable roleMappingList?: Models.IRoleRightsMapping[] = []
  @observable arrSelectedRole?: any[] = []
  constructor() {
    makeAutoObservable(this)
  }

  @action fetchRoleMappingList() {
    Services.roleMappingList().then((list) => {
      this.roleMappingList = list
    })
  }

  @action updateRole = (roles: any) => {
    this.arrSelectedRole = roles
  }
}
export default RoleRightsMappingStore
