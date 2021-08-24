import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
class LabStore {
  @observable listLabs: Models.Labs[] = []
  @observable listLabsCount: number = 0 
  @ignore @observable labs?: Models.Labs
  @ignore @observable checkExitsCode?: boolean = false

  constructor() {
    makeAutoObservable(this)
    this.labs = {
      ...this.labs,
      openingTime: LibraryUtils.moment().format("hh:mm a"),
      closingTime: LibraryUtils.moment().format("hh:mm a"),
    }
  }

  @computed get LabService() {
    return new Services.LabService()
  }

  fetchListLab(page?,limit?) {
    this.LabService.listLabs(page,limit).then((res) => {
      // console.log({ lab: res })
      this.listLabs = res
    })
  }

  @action setExitsCode(status: boolean) {
    this.checkExitsCode = status
  }

  @action updateLabs = (labs: Models.Labs) => {
    this.labs = labs
  }
}

export default LabStore
