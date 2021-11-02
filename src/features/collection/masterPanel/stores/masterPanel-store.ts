import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as ModelsSection from "@lp/features/collection/section/models"

@version(0.1)
export class MasterPanelStore {
  @ignore @observable masterPanel!: Models.MasterPanel
  @observable listMasterPanel: Models.MasterPanel[]
  @observable listMasterPanelCount!: number
  @ignore @observable checkExitsLabEnvCode!: boolean
  @observable sectionListByDeptCode!: ModelsSection.Section[]

  constructor() {
    this.listMasterPanel = []
    this.checkExitsLabEnvCode = false
    this.masterPanel = {
      ...this.masterPanel,
      dateCreation: new Date(),
      dateActiveFrom: new Date(),
      dateActiveTo: new Date(),
      version: 1,
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
    makeObservable<MasterPanelStore, any>(this, {
      masterPanel: observable,
      listMasterPanel: observable,
      listMasterPanelCount: observable,
      checkExitsLabEnvCode: observable,
      sectionListByDeptCode: observable,
    })
  }

  @computed get masterPanelService() {
    return new Services.MasterPanelService()
  }

  @action fetchPanelMaster(page?, limit?) {
    this.masterPanelService.listPanelMaster(page, limit)
  }

  @action updatePanelMasterList(res: any) {
    if (!res.panelMasters.success) return alert(res.panelMasters.message)
    this.listMasterPanel = res.panelMasters.data
    this.listMasterPanelCount = res.panelMasters.paginatorInfo.count
  }

  @action findSectionListByDeptCode = (code: string) => {
    this.masterPanelService.findSectionListByDeptCode(code)
  }

  @action updateSectionListByDeptCode(res: any) {   
    if (!res.findSectionListByDeptCode.success)
      return alert(`${res.findSectionListByDeptCode.message}`)
    this.sectionListByDeptCode = res.findSectionListByDeptCode.data
  }

  @action updateMasterPanel(analyte: Models.MasterPanel) {
    this.masterPanel = analyte
  }

  @action updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}
