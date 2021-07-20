import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"

@version(0.1)
class LabMappingStore {
  @ignore @observable lab?: Models.ILabMapping
  @observable labMappingList?: Models.ILabMapping[] = []
  @observable arrSelectedLabs?: any[] = []
  constructor() {
    makeAutoObservable(this)
  }

  @computed get LabMappingService() {
    return new Services.LabMappingService(
    )
  }

  @action fetchLabMappingList() {
    this.LabMappingService.labMappingList().then((list) => {
      // console.log({ rolMapping: list })
      this.labMappingList = list
    })
  }

  @action updateLab = (labs: any) => {
    this.arrSelectedLabs = labs
  }
}
export default LabMappingStore
