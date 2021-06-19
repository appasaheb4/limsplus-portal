import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
   
@version(0.1)
class TestSampleMappingStore {
  @observable listSampleType: Models.TestSampleMapping[] = []
  @ignore @observable sampleType?: Models.TestSampleMapping
  
  constructor() {
    makeAutoObservable(this)
  }

  @computed get testSampleMappingService() {
    return new Services.TestSampleMappingService(
      Stores.loginStore.login?.accessToken as string
    )
  }

  fetchSampleTypeList() {
    this.testSampleMappingService.listSampleType().then((res) => {
      this.listSampleType = res
    })
  }
  @action updateSampleType = (sampleType: Models.TestSampleMapping) => {
    this.sampleType = sampleType
  }
}

export default TestSampleMappingStore
