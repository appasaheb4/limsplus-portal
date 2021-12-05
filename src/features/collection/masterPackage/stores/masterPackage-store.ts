import { version } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import dayjs from "dayjs"

@version(0.1)
export class MasterPackageStore {
  masterPackage!: Models.MasterPackage
  listMasterPackage!: Models.MasterPackage[]
  listMasterPackageCount!: number
  checkExitsLabEnvCode!: boolean

  constructor() {
    this.listMasterPackage = []
    this.listMasterPackageCount = 0
    this.checkExitsLabEnvCode = false
    this.masterPackage = {
      ...this.masterPackage,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(
        dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")
      ),
      version: 1,
      bill: false,
    }
    makeObservable<MasterPackageStore, any>(this, {
      masterPackage: observable,
      listMasterPackage: observable,
      listMasterPackageCount: observable,
      checkExitsLabEnvCode: observable,

      masterPackageService: computed,
      fetchPackageMaster: action,
      updatePackageMasterList: action,
      updateMasterPackage: action,
      updateExistsLabEnvCode: action,
      filterPackageMasterList:action
    })
  }

  get masterPackageService() {
    return new Services.MasterPackageService()
  }

  fetchPackageMaster(page?, limit?) {
    this.masterPackageService.listPackageMaster(page, limit)
  }

  updatePackageMasterList(res: any) {
    if (!res.packageMasters.success) return alert(res.packageMasters.message)
    this.listMasterPackage = res.packageMasters.data
    this.listMasterPackageCount = res.packageMasters.paginatorInfo.count
  }

  filterPackageMasterList(res: any) {
    this.listMasterPackage = res.filterPackageMaster.data
    this.listMasterPackageCount = res.filterPackageMaster.paginatorInfo.count
  }

  updateMasterPackage(pacakge: Models.MasterPackage) {
    this.masterPackage = pacakge
  }

  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}
