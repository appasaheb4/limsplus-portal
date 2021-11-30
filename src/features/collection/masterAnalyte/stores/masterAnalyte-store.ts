import { version } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import dayjs from "dayjs"

@version(0.1)
export class MasterAnalyteStore {
  masterAnalyte!: Models.MasterAnalyte
  listMasterAnalyte!: Models.MasterAnalyte[]
  listMasterAnalyteCount: number = 0
  checkExitsLabEnvCode: boolean = false

  constructor() {
    this.listMasterAnalyte = []
    this.masterAnalyte = {
      ...this.masterAnalyte,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateActiveTo: new Date(
        dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")
      ),
      version: 1,
      schedule: new Date(),
      bill: false,
      autoRelease: false,
      holdOOS: false,
      instantResult: false,
      method: false,
      display: true,
      calculationFlag: false,
      repetition: false,
    }
    makeObservable<MasterAnalyteStore, any>(this, {
      masterAnalyte: observable,
      listMasterAnalyte: observable,
      listMasterAnalyteCount: observable,
      checkExitsLabEnvCode: observable,

      masterAnalyteService: computed,
      fetchAnalyteMaster: action,
      updateMasterAnalyteList: action,
      updateMasterAnalyte: action,
      updateExistsLabEnvCode: action,
      filterMasterAnalyteList: action
    })
  }

  get masterAnalyteService() {
    return new Services.MasterAnalyteService()
  }

  fetchAnalyteMaster(page?, limit?) {
    this.masterAnalyteService.listAnalyteMaster(page, limit)
  }

  updateMasterAnalyteList(res: any) {
    if (!res.analyteMasters.success) return alert(res.analyteMasters.message)
    this.listMasterAnalyte = res.analyteMasters.data
    this.listMasterAnalyteCount = res.analyteMasters.paginatorInfo.count
  }
    
  filterMasterAnalyteList(res: any) {
    this.listMasterAnalyte = res.filterAnalyteMaster.data
    this.listMasterAnalyteCount = res.filterAnalyteMaster.paginatorInfo.count
  }

  updateMasterAnalyte(analyte: Models.MasterAnalyte) {
    this.masterAnalyte = analyte
  }

  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}
