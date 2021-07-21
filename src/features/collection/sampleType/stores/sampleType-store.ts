import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
   
@version(0.1)
class SampleTypeStore {
  @observable listSampleType: Models.SampleType[] = []
  @ignore @observable sampleType?: Models.SampleType

  constructor() {
    makeAutoObservable(this)
  }

  @computed get sampleTypeService() {
    return new Services.SampleTypeService(
    )
  }

  fetchSampleTypeList() {
    this.sampleTypeService.listSampleType().then((res) => {
      this.listSampleType = res
    })
  }
  @action updateSampleType = (sampleType: Models.SampleType) => {
    this.sampleType = sampleType
  }
}

export default SampleTypeStore
