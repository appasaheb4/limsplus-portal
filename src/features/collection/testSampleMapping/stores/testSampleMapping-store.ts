import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
class TestSampleMappingStore {
  @observable listTestSampleMapping: Models.TestSampleMapping[] = []
  @observable listTestSampleMappingCount: number = 0 
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

  @action fetchSampleTypeList(page?,limit?) {
    this.testSampleMappingService.listTestSampleMapping(page,limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listTestSampleMapping = res.data.testSampleMapping
      this.listTestSampleMappingCount = res.data.count
    })
  }
  @action updateSampleType = (sampleMapping: Models.TestSampleMapping) => {
    this.testSampleMapping = sampleMapping
  }
}

export default TestSampleMappingStore
