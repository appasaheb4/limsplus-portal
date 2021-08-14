import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class RoleStore {
  @observable listRole: Models.Role[] = []
  @ignore @observable role?: Models.Role
  @ignore @observable checkExitsCode?: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  private init() {
    return {
      code: "",
      name: "",
    }
  }
  @computed get RoleService() {
    return new Services.RoleService()
  }
  fetchListRole() {
    this.RoleService.listRole().then((res) => {
      // console.log({ role: res });
      this.listRole = res
    })
  }
  @action setExitsCode(status: boolean) {
    this.checkExitsCode = status
  }

  @action updateRole = (role: Models.Role) => {
    this.role = role
  }

  @action clear() {
    this.role = this.init()
  }
}

export default RoleStore
