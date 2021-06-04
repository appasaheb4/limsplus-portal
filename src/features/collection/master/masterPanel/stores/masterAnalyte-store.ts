import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
@version(0.1)
class MasterPanelStore {
  @ignore @observable masterPanel?: Models.MasterPanel

  constructor() {
    makeAutoObservable(this)
  }

  @computed get MasterPanelService() {
    return new Services.MasterPanelService(
      Stores.loginStore.login?.accessToken as string
    )
  }

  @action updateMasterPanel(analyte: Models.MasterPanel) {
    this.masterPanel = analyte
  }
}

export default MasterPanelStore
