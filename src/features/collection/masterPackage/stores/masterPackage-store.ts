import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
import * as LibraryUtils from "@lp/library/utils"



@version(0.1)
class MasterPackageStore {
  @ignore @observable masterPackage?: Models.MasterPackage
  @observable listMasterPackage?: Models.MasterPackage[] =[]
  @observable listMasterPackageCount: number = 0 

  constructor() {
    makeAutoObservable(this)
    this.masterPackage = {
      ...this.masterPackage,
      dateCreation: LibraryUtils.moment().unix(),
      dateActiveFrom: LibraryUtils.moment().unix(),
      dateActiveTo: LibraryUtils.moment().unix(),
      version: 1,
      keyNum: "1",
      enteredBy: Stores.loginStore.login?._id,
      bill: false,
    }
  }

  @computed get masterPackageService() {
    return new Services.MasterPackageService(
    )
  }

  @action fetchPackageMaster(page?,limit?) {
    this.masterPackageService.listPackageMaster(page,limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listMasterPackage = res.data.packageMaster
      this.listMasterPackageCount = res.data.count
    })
  }

  @action updateMasterPackage(pacakge: Models.MasterPackage) {
    this.masterPackage = pacakge
  }
}

export default MasterPackageStore
