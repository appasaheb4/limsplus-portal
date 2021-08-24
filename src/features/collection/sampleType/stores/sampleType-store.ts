import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
   
@version(0.1)
class SampleTypeStore {
  @observable listSampleType: Models.SampleType[] = []
  @observable listSampleTypeCount: number = 0
  @ignore @observable sampleType?: Models.SampleType

  constructor() {
    makeAutoObservable(this)
  }

  @computed get sampleTypeService() {
    return new Services.SampleTypeService(
    )
  }

  fetchSampleTypeList(page?,limit?) {
    this.sampleTypeService.listSampleType(page,limit).then((res) => {
      this.listSampleType = res
    })
  }
  @action updateSampleType = (sampleType: Models.SampleType) => {
    this.sampleType = sampleType
  }
}

export default SampleTypeStore
