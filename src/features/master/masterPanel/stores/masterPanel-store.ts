import { version } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import { Toast } from "@/library/components"
import { MasterPanel } from "../models"
import { MasterPanelService } from "../services"
import * as ModelsSection from "@/features/master/section/models"
import dayjs from "dayjs"

@version(0.1)
export class MasterPanelStore {
  masterPanel!: MasterPanel
  listMasterPanel: MasterPanel[]
  listMasterPanelCopy!: MasterPanel[]
  listMasterPanelCount!: number
  checkExitsLabEnvCode!: boolean
  sectionListByDeptCode!: ModelsSection.Section[]

  constructor() {
    this.listMasterPanel = []
    this.listMasterPanelCount = 0
    this.checkExitsLabEnvCode = false
    this.masterPanel = {
      ...this.masterPanel,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")),
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
      pageBreak: false,
      validationLevel: 0,
    }
    makeObservable<MasterPanelStore, any>(this, {
      masterPanel: observable,
      listMasterPanel: observable,
      listMasterPanelCount: observable,
      checkExitsLabEnvCode: observable,
      sectionListByDeptCode: observable,

      masterPanelService: computed,
      fetchPanelMaster: action,
      updatePanelMasterList: action,
      findSectionListByDeptCode: action,
      updateSectionListByDeptCode: action,
      updateMasterPanel: action,
      updateExistsLabEnvCode: action,
      filterPanelMasterList: action,
    })
  }

  get masterPanelService() {
    return new MasterPanelService()
  }

  fetchPanelMaster(page?, limit?) {
    this.masterPanelService.listPanelMaster(page, limit)
  }

  updatePanelMasterList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.panelMasters.success) return alert(res.panelMasters.message)
      this.listMasterPanel = res.panelMasters.data
      this.listMasterPanelCopy = res.panelMasters.data
      this.listMasterPanelCount = res.panelMasters.paginatorInfo.count
    } else {
      this.listMasterPanel = res
    }
  }

  filterPanelMasterList(res: any) {
    this.listMasterPanel = res.filterPanelMaster.data
    this.listMasterPanelCount = res.filterPanelMaster.paginatorInfo.count
  }

  findSectionListByDeptCode = (code: string) => {
    this.masterPanelService.findSectionListByDeptCode(code)
  }

  updateSectionListByDeptCode(res: any) {
    if (!res.findSectionListByDeptCode.success)
      return Toast.warning({
        message: `😔 ${res.findSectionListByDeptCode.message}`,
      })
    this.sectionListByDeptCode = res.findSectionListByDeptCode.data
  }

  updateMasterPanel(analyte: MasterPanel) {
    this.masterPanel = analyte
  }

  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}
