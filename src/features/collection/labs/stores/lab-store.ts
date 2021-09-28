import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"
import { stores } from "@lp/stores"

@version(0.1)
export class LabStore {
  @observable listLabs!: Models.Labs[]
  @observable listLabsCount: number = 0
  @ignore @observable labs?: Models.Labs
  @ignore @observable checkExitsEnvCode?: boolean = false

  constructor() {
    this.listLabs = []
    makeObservable<LabStore, any>(this, {
      listLabs: observable,
      listLabsCount: observable,
      labs: observable,
      checkExitsEnvCode: observable,
      LabService: computed,
      fetchListLab: action,
      setExitsEnvCode: action,
      updateLabs: action,
    })
    this.labs = {
      ...this.labs,
      openingTime: LibraryUtils.moment().format("hh:mm a"),
      closingTime: LibraryUtils.moment().format("hh:mm a"),
    }
  }

  get LabService() {
    return new Services.LabService()
  }

  fetchListLab(page?, limit?) {
    this.LabService.listLabs(page, limit).then((res) => {
      if (!res.success) return alert(res.message)

      
      this.listLabs = res.data.labs
      this.listLabsCount = res.data.count
      console.log({labs: res});
      
    })
  }

  setExitsEnvCode(status: boolean) {
    this.checkExitsEnvCode = status
  }

  updateLabs = (labs: Models.Labs) => {
    this.labs = labs
  }
}
