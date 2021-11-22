import { version } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
export class TestAnalyteMappingStore {
  testAnalyteMapping!: Models.TestAnalyteMapping
  listTestAnalyteMapping!: Models.TestAnalyteMapping[]
  listTestAnalyteMappingCount: number = 0
  checkExitsLabEnvCode?: boolean = false

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

      testAnalyteMappingService: computed,
      fetchTestAnalyteMapping: action,
      updateTestAnalyteMappingList: action,
      updateTestAnalyteMapping: action,
      updateExistsLabEnvCode: action,
      filterTestAnalyteMappingList: action
    })
  }
  get testAnalyteMappingService() {
    return new Services.TestAnalyteMappingService()
  }

  fetchTestAnalyteMapping(page?, limit?) {
    this.testAnalyteMappingService.listTestAnalyteMapping(page, limit)
  }

  updateTestAnalyteMappingList(res: any) {
    if (!res.testAnalyteMappings.success)
      return alert(res.testAnalyteMappings.message)
    this.listTestAnalyteMapping = res.testAnalyteMappings.data
    this.listTestAnalyteMappingCount = res.testAnalyteMappings.paginatorInfo.count
  }

  filterTestAnalyteMappingList(res: any) {
    this.listTestAnalyteMapping = res.filterTestAnalyteMappings.data
    this.listTestAnalyteMappingCount = res.filterTestAnalyteMappings.paginatorInfo.count
  }

  updateTestAnalyteMapping(testAnalyte: Models.TestAnalyteMapping) {
    this.testAnalyteMapping = testAnalyte
  }

  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}
