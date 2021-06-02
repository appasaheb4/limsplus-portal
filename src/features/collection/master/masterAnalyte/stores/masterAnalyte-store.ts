import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
@version(0.1)
class MasterAnalyteStore {
  @ignore @observable masterAnalyte?: Models.MasterAnalyte

  constructor() {
    makeAutoObservable(this)
  }

  @computed get LabService() {
    return new Services.MasterAnalyteService(
      Stores.loginStore.login?.accessToken as string
    )
  }  

  @action updateMasterAnalyte(analyte: Models.MasterAnalyte) {
    this.masterAnalyte = analyte
  }
}

export default MasterAnalyteStore
