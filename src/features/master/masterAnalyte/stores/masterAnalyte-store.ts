import { version } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import { MasterAnalyte, SelectedItems, MasterAnalyteActivity } from "../models"
import { MasterAnalyteService } from "../services"
import dayjs from "dayjs"

@version(0.1)
export class MasterAnalyteStore {
  masterAnalyte!: MasterAnalyte
  listMasterAnalyte!: MasterAnalyte[]
  listMasterAnalyteCopy!: MasterAnalyte[]
  listMasterAnalyteCount: number = 0
  checkExitsLabEnvCode: boolean = false
  selectedItems!: SelectedItems
  masterAnalyteActivity!: MasterAnalyteActivity

  constructor() {
    this.listMasterAnalyte = []
    this.masterAnalyte = {
      ...this.masterAnalyte,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")),
      version: 1,
      schedule: new Date(),
      bill: false,
      instantResult: false,
      method: false,
      reportable: true,
      calculationFlag: false,
      repetition: false,
    }
    makeObservable<MasterAnalyteStore, any>(this, {
      masterAnalyte: observable,
      listMasterAnalyte: observable,
      listMasterAnalyteCount: observable,
      checkExitsLabEnvCode: observable,
      selectedItems: observable,
      masterAnalyteActivity: observable,

      masterAnalyteService: computed,
      fetchAnalyteMaster: action,
      updateMasterAnalyteList: action,
      updateMasterAnalyte: action,
      updateExistsLabEnvCode: action,
      filterMasterAnalyteList: action,
      updateMasterAnalyteActivity: action,
    })
  }

  get masterAnalyteService() {
    return new MasterAnalyteService()
  }

  fetchAnalyteMaster(page?, limit?) {
    this.masterAnalyteService.listAnalyteMaster(page, limit)
  }

  updateMasterAnalyteList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.analyteMasters.success) return alert(res.analyteMasters.message)
      this.listMasterAnalyte = res.analyteMasters.data
      this.listMasterAnalyteCopy = res.analyteMasters.data
      this.listMasterAnalyteCount = res.analyteMasters.paginatorInfo.count
    } else {
      this.listMasterAnalyte = res
    }
  }

  filterMasterAnalyteList(res: any) {
    this.listMasterAnalyte = res.filterAnalyteMaster.data
    this.listMasterAnalyteCount = res.filterAnalyteMaster.paginatorInfo.count
  }

  updateMasterAnalyte(analyte: MasterAnalyte) {
    this.masterAnalyte = analyte
  }

  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
  updateSelectedItems(items: SelectedItems | undefined) {
    if (items) this.selectedItems = items
    else this.selectedItems = new SelectedItems({})
  }
  updateMasterAnalyteActivity(items: MasterAnalyteActivity) {
    this.masterAnalyteActivity = items
  }
}
