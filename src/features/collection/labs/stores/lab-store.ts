import { version } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
export class LabStore {
  listLabs!: Models.Labs[]
  listLabsCount: number = 0
  labs!: Models.Labs
  checkExitsEnvCode: boolean = false

  constructor() {
    this.listLabs = []
    this.labs = {
      ...this.labs,
      openingTime: LibraryUtils.moment().format("hh:mm a"),
      closingTime: LibraryUtils.moment().format("hh:mm a"),
    }

    makeObservable<LabStore, any>(this, {
      listLabs: observable,
      listLabsCount: observable,
      labs: observable,
      checkExitsEnvCode: observable,

      LabService: computed,
      fetchListLab: action,
      updateLabList: action,
      filterLabList: action,
      setExitsEnvCode: action,
      updateLabs: action,
    })
  }

  get LabService() {
    return new Services.LabService()
  }

  fetchListLab(page?, limit?) {
    this.LabService.listLabs(page, limit)
  }

  updateLabList(res: any) {
    if (!res.labs.success) return alert(res.labs.message)
    this.listLabs = res.labs.data
    this.listLabsCount = res.labs.paginatorInfo.count
  }

  filterLabList(res: any) {
    this.listLabs = res.filterLabs.data
    this.listLabsCount = res.filterLabs.paginatorInfo.count
  }

  setExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status
  }

  updateLabs = (labs: Models.Labs) => {
    this.labs = labs
  }
}
