import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import dayjs from "dayjs"

@version(0.1)
export class MasterPackageStore {
  @ignore @observable masterPackage!: Models.MasterPackage
  @observable listMasterPackage!: Models.MasterPackage[]
  @observable listMasterPackageCount!: number
  @ignore @observable checkExitsLabEnvCode!: boolean

  constructor() {
    this.listMasterPackage = []
    this.listMasterPackageCount = 0
    this.checkExitsLabEnvCode = false
    this.masterPackage = {
      ...this.masterPackage,
      dateCreation: new Date(),
      dateActiveFrom: new Date(),
      dateActiveTo: new Date(dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")),
      version: 1,
      bill: false,
    }
    makeObservable<MasterPackageStore, any>(this, {
      masterPackage: observable,
      listMasterPackage: observable,
      listMasterPackageCount: observable,
      checkExitsLabEnvCode: observable,
    })
  }

  @computed get masterPackageService() {
    return new Services.MasterPackageService()
  }  
  
  @action fetchPackageMaster(page?, limit?) {
    this.masterPackageService.listPackageMaster(page, limit)
  }
  
  @action updatePackageMasterList(res: any) {
    if (!res.packageMasters.success) return alert(res.packageMasters.message)
    this.listMasterPackage = res.packageMasters.data
    this.listMasterPackageCount = res.packageMasters.paginatorInfo.count
  }

  @action updateMasterPackage(pacakge: Models.MasterPackage) {
    this.masterPackage = pacakge
  }

  @action updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}
