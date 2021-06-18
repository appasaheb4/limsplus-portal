import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
import * as LibraryUtils from "@lp/library/utils"
@version(0.1)
class MasterPanelStore {
  @ignore @observable masterPanel?: Models.MasterPanel

  constructor() {
    makeAutoObservable(this)
    this.masterPanel = {
      ...this.masterPanel,
      dateCreation: LibraryUtils.moment().unix(),
      dateActive: LibraryUtils.moment().unix(),
      version: 1,
      keyNum: "1",
      enteredBy: Stores.loginStore.login?._id,
    }
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
