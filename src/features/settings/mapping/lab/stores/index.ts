import { version, ignore } from "mobx-sync"
import { action, observable } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class LabMappingStore {
  @ignore @observable lab?: Models.ILabMapping
  @observable labMappingList?: Models.ILabMapping[] = []
  @observable arrSelectedLabs?: any[] = []

  @action fetchLabMappingList() {
    Services.labMappingList().then((list) => {
     // console.log({ rolMapping: list })
      this.labMappingList = list
    })
  }

  @action updateLab = (labs: any) => {
    this.arrSelectedLabs = labs
  }
}
export default LabMappingStore
