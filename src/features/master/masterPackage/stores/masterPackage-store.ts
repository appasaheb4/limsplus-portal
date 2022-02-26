import { version } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import { MasterPackage, SelectedItems } from "../models"
import { MasterPackageService } from "../services"
import dayjs from "dayjs"

@version(0.1)
export class MasterPackageStore {
  masterPackage!: MasterPackage
  listMasterPackage!: MasterPackage[]
  listMasterPackageCopy!: MasterPackage[]
  listMasterPackageCount!: number
  checkExitsLabEnvCode!: boolean
  selectedItems!: SelectedItems

  constructor() {
    this.listMasterPackage = []
    this.listMasterPackageCopy = []
    this.listMasterPackageCount = 0
    this.checkExitsLabEnvCode = false
    this.masterPackage = {
      ...this.masterPackage,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")),
      version: 1,
      bill: false,
      printPackageName: false,
      printPanelName: true,
    }
    makeObservable<MasterPackageStore, any>(this, {
      masterPackage: observable,
      listMasterPackage: observable,
      listMasterPackageCopy: observable,
      listMasterPackageCount: observable,
      checkExitsLabEnvCode: observable,
      selectedItems: observable,

      masterPackageService: computed,
      fetchPackageMaster: action,
      updatePackageMasterList: action,
      updateMasterPackage: action,
      updateExistsLabEnvCode: action,
      filterPackageMasterList: action,
    })
  }

  get masterPackageService() {
    return new MasterPackageService()
  }

  fetchPackageMaster(page?, limit?) {
    this.masterPackageService.listPackageMaster(page, limit)
  }

  updatePackageMasterList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.packageMasters.success) return alert(res.packageMasters.message)
      this.listMasterPackage = res.packageMasters.data
      this.listMasterPackageCopy = res.packageMasters.data
      this.listMasterPackageCount = res.packageMasters.paginatorInfo.count
    } else {
      this.listMasterPackage = res
    }
  }

  filterPackageMasterList(res: any) {
    this.listMasterPackage = res.filterPackageMaster.data
    this.listMasterPackageCount = res.filterPackageMaster.paginatorInfo.count
  }

  updateMasterPackage(pacakge: MasterPackage) {
    this.masterPackage = pacakge
  }

  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }

  updateSelectedItems(items: SelectedItems | undefined) {
    if (items) this.selectedItems = items
    else this.selectedItems = new SelectedItems({})
  }
}
