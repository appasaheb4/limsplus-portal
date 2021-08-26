import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as LibraryUtils from "@lp/library/utils"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
@version(0.1)
class MasterAnalyteStore {
  @ignore @observable masterAnalyte?: Models.MasterAnalyte
  @observable listMasterAnalyte?: Models.MasterAnalyte[] = []
  @observable listMasterAnalyteCount: number = 0

  constructor() {
    makeAutoObservable(this)
    this.masterAnalyte = {
      ...this.masterAnalyte,
      dateCreation: LibraryUtils.moment().unix(),
      dateActiveFrom: LibraryUtils.moment().unix(),
      dateActiveTo: LibraryUtils.moment().unix(),
      version: 1,
      keyNum: "1",
      enteredBy: Stores.loginStore.login?._id,
      schedule: LibraryUtils.moment().unix(),
      bill: false,
      autoRelease: false,
      holdOOS: false,
      instantResult: false,
      // pageBreak: false,
      method: false,
      display: true,
      calculationFlag: false,
      repetition: false,
    }
  }
  @computed get masterAnalyteService() {
    return new Services.MasterAnalyteService()
  }

  @action fetchAnalyteMaster(page?, limit?) {
    this.masterAnalyteService.listAnalyteMaster(page, limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listMasterAnalyte = res.data.analyteMaster
      this.listMasterAnalyteCount = res.data.count
    })
  }

  @action updateMasterAnalyte(analyte: Models.MasterAnalyte) {
    this.masterAnalyte = analyte
  }
}

export default MasterAnalyteStore
