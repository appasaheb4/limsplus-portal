import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
@version(0.1)
class MasterPackageStore {
  @ignore @observable masterPackage?: Models.MasterPackage

  constructor() {
    makeAutoObservable(this)
  }

  @computed get MasterPackageService() {
    return new Services.MasterPackageService(
      Stores.loginStore.login?.accessToken as string
    )
  }

  @action updateMasterPackage(pacakge: Models.MasterPackage) {
    this.masterPackage = pacakge
  }
}

export default MasterPackageStore
