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
    this.testSampleMapping = {
      ...this.testSampleMapping,
      primaryContainer: false,
      uniqueContainer: false,
      centerIfuge: false,
      aliquot: false,
      labSpecfic: false,
      departmentSpecfic: false,
      sharedSample: false,
      printLabels: false,
    }
  }

  @computed get testSampleMappingService() {
    return new Services.TestSampleMappingService(
    )
  }

  fetchSampleTypeList() {
    this.testSampleMappingService.listTestSampleMapping().then((res) => {
      this.listTestSampleMapping = res
    })
  }
  @action updateSampleType = (sampleMapping: Models.TestSampleMapping) => {
    this.testSampleMapping = sampleMapping
  }
}

export default TestSampleMappingStore
