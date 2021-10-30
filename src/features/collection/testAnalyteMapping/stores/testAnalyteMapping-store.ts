import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
export class TestAnalyteMappingStore {
  @ignore @observable testAnalyteMapping!: Models.TestAnalyteMapping
  @observable listTestAnalyteMapping!: Models.TestAnalyteMapping[]
  @observable listTestAnalyteMappingCount: number = 0
  @ignore @observable checkExitsLabEnvCode?: boolean = false

  constructor() {   
    this.listTestAnalyteMapping = []
    this.testAnalyteMapping = {
      ...this.testAnalyteMapping,
      dateCreation: new Date(),
      dateActiveFrom: new Date(),
      dateActiveTo: new Date(),
      version: 1,
      bill: false,
    }
    makeObservable<TestAnalyteMappingStore, any>(this, {
      testAnalyteMapping: observable,
      listTestAnalyteMapping: observable,
      listTestAnalyteMappingCount: observable,
      checkExitsLabEnvCode: observable,
    })
  }

  @computed get testAnalyteMappingService() {
    return new Services.TestAnalyteMappingService()
  }

  @action fetchTestAnalyteMapping(page?, limit?) {
    this.testAnalyteMappingService.listTestAnalyteMapping(page, limit)
  }

  @action updateTestAnalyteMappingList(res: any) {
    if (!res.testAnalyteMappings.success) return alert(res.testAnalyteMappings.message)
    this.listTestAnalyteMapping = res.testAnalyteMappings.data
    this.listTestAnalyteMappingCount = res.testAnalyteMappings.paginatorInfo.count
  }

  @action updateTestAnalyteMapping(testAnalyte: Models.TestAnalyteMapping) {
    this.testAnalyteMapping = testAnalyte
  }
  
  @action updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}
