import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
   
@version(0.1)
class TestSampleMappingStore {
  @observable listTestSampleMapping: Models.TestSampleMapping[] = []
  @ignore @observable testSampleMapping?: Models.TestSampleMapping
  
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
      this.listTestSampleMapping = res
    })
  }
  @action updateSampleType = (sampleMapping: Models.TestSampleMapping) => {
    this.testSampleMapping = sampleMapping
  }
}

export default TestSampleMappingStore
