import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
export class MasterAnalyteStore {
  @ignore @observable masterAnalyte!: Models.MasterAnalyte
  @observable listMasterAnalyte!: Models.MasterAnalyte[]
  @observable listMasterAnalyteCount: number = 0
  @ignore @observable checkExitsLabEnvCode: boolean = false

  constructor() {
    this.listMasterAnalyte = []
    this.masterAnalyte = {
      ...this.masterAnalyte,
      dateCreation: new Date(),
      dateActiveFrom: new Date(),
      dateActiveTo: new Date(),
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
    })
  }

  @computed get masterAnalyteService() {
    return new Services.MasterAnalyteService()
  }

  @action fetchAnalyteMaster(page?, limit?) {
    this.masterAnalyteService.listAnalyteMaster(page, limit)
  }

  @action updateMasterAnalyteList(res: any) {
    if (!res.analyteMasters.success) return alert(res.analyteMasters.message)
    this.listMasterAnalyte = res.analyteMasters.data
    this.listMasterAnalyteCount = res.data.count
  }

  @action updateMasterAnalyte(analyte: Models.MasterAnalyte) {
    this.masterAnalyte = analyte
  }

  @action updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}
