import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class LabMappingStore {
  @ignore @observable lab?: Models.ILabMapping
  @observable labMappingList?: Models.ILabMapping[] = []
  @observable labMappingListCount: number = 0 
  @observable arrSelectedLabs?: any[] = []
  constructor() {
    makeAutoObservable(this)
  }

  @computed get LabMappingService() {
    return new Services.LabMappingService(
    )
  }

  @action fetchLabMappingList() {
    this.LabMappingService.labMappingList().then((res) => {
      if (!res.success) return alert(res.message)
      // console.log({ rolMapping: list })
      this.labMappingList = res.data.labMappingList
      this.labMappingListCount = res.data.count
    })
  }

  @action updateLab = (labs: any) => {
    this.arrSelectedLabs = labs
  }
}
export default LabMappingStore
