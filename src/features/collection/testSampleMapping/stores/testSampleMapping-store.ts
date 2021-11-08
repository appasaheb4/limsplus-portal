import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
export class TestSampleMappingStore {
  @observable listTestSampleMapping: Models.TestSampleMapping[]
  @observable listTestSampleMappingCount: number
  @ignore @observable testSampleMapping!: Models.TestSampleMapping
  @ignore @observable checkExitsTestSampleEnvCode: boolean

  constructor() {
    this.listTestSampleMapping = []
    this.listTestSampleMappingCount = 0
    this.checkExitsTestSampleEnvCode = false
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

    makeObservable<TestSampleMappingStore, any>(this, {
      listTestSampleMapping: observable,
      listTestSampleMappingCount: observable,
      testSampleMapping: observable,
      checkExitsTestSampleEnvCode: observable,
    })
  }

  @computed get testSampleMappingService() {
    return new Services.TestSampleMappingService()
  }

  @action fetchSampleTypeList(page?, limit?) {
    this.testSampleMappingService.listTestSampleMapping(page, limit)
  }

  @action updateTestSampleMappingList(res: any) {
    if (!res.testSampleMappings.success) return alert(res.testSampleMappings.message)
    this.listTestSampleMapping = res.testSampleMappings.data
    this.listTestSampleMappingCount = res.testSampleMappings.paginatorInfo.count
  }

  @action updateSampleType = (sampleMapping: Models.TestSampleMapping) => {
    this.testSampleMapping = sampleMapping
  }

  @action updateExitsTestSampleEnvCode = (status: boolean) => {
    this.checkExitsTestSampleEnvCode = status
  }
}
