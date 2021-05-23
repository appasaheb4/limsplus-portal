import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
class RoleStore {
  @observable listRole: Models.IRole[] = []
  @ignore @observable role?: Models.IRole
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
    return new Services.RoleService(Stores.loginStore.login?.accessToken as string)
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

  @action updateRole = (role: Models.IRole) => {
    this.role = role
  }

  @action clear() {
    this.role = this.init()
  }
}

export default RoleStore
