import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
//import * as LibraryUtils from "@lp/library/utils"
import * as Models from "../models"
import * as Services from "../services"
//import { Stores } from "@lp/features/login/stores"
@version(0.1)
class MasterAnalyteStore {
  @ignore @observable masterAnalyte?: Models.PriceList
  @observable listMasterAnalyte?: Models.PriceList[] = []

  constructor() {
    makeAutoObservable(this)   
    // this.masterAnalyte = {
    //   ...this.masterAnalyte,
    //   dateCreation: LibraryUtils.moment().unix(),
    //   dateActiveFrom: LibraryUtils.moment().unix(),
    //   dateActiveTo: LibraryUtils.moment().unix(),
    //   version: 1,
    //   keyNum: "1",
    //   schedule: LibraryUtils.moment().unix(),
    //   bill: false,
    //   autoRelease: false,
    //   holdOOS: false,
    //   instantResult: false,
    //   // pageBreak: false,
    //   method: false,
    //   display: true,
    //   calculationFlag: false,
    //   repetition: false,
    // }
  }
  @computed get masterAnalyteService() {
    return new Services.MasterAnalyteService()
  }

  fetchAnalyteMaster() {
    this.masterAnalyteService.listAnalyteMaster().then((res) => {
      this.listMasterAnalyte = res
    })
  }

  @action updateMasterAnalyte(analyte: Models.PriceList) {
    this.masterAnalyte = analyte
  }
}

export default MasterAnalyteStore
