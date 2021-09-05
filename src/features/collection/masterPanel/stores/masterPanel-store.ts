import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"
@version(0.1)
class MasterPanelStore {
  @ignore @observable masterPanel?: Models.MasterPanel
  @observable listMasterPanel?: Models.MasterPanel[] = []
  @observable listMasterPanelCount: number = 0
  @ignore @observable checkExitsLabEnvCode?: boolean = false

  constructor() {
    makeAutoObservable(this)

    this.masterPanel = {
      ...this.masterPanel,
      dateCreation: LibraryUtils.moment().unix(),
      dateActiveFrom: LibraryUtils.moment().unix(),
      dateActiveTo: LibraryUtils.moment().unix(),
      version: 1,
      keyNum: "1",
      bill: false,
      autoRelease: false,
      holdOOS: false,
      confidential: false,
      urgent: false,
      instantResult: false,
      sexAction: false,
      repitation: false,
      printLabel: false,
      method: false,
      cumulative: false,
    }
  }

  @computed get masterPanelService() {
    return new Services.MasterPanelService()
  }

  @action fetchPanelMaster(page?, limit?) {
    this.masterPanelService.listPanelMaster(page, limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listMasterPanel = res.data.masterPanel
      this.listMasterPanelCount = res.data.count
    })
  }

  @action updateMasterPanel(analyte: Models.MasterPanel) {
    this.masterPanel = analyte
  }

  @action updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}

export default MasterPanelStore
