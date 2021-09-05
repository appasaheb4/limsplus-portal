import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
class TestAnalyteMappingStore {
  @ignore @observable testAnalyteMapping?: Models.TestAnalyteMapping
  @observable listTestAnalyteMapping?: Models.TestAnalyteMapping[] = []
  @observable listTestAnalyteMappingCount: number = 0
  @ignore @observable checkExitsLabEnvCode?: boolean = false

  constructor() {
    makeAutoObservable(this)
    this.testAnalyteMapping = {
      ...this.testAnalyteMapping,
      dateCreation: LibraryUtils.moment().unix(),
      dateActiveFrom: LibraryUtils.moment().unix(),
      dateActiveTo: LibraryUtils.moment().unix(),
      version: 1,
      keyNum: "1",
      bill:false
    }
  }

  @computed get testAnalyteMappingService() {
    return new Services.TestAnalyteMappingService(
    )
  }

  @action fetchTestAnalyteMapping(page?,limit?) {
    this.testAnalyteMappingService.listTestAnalyteMapping(page,limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listTestAnalyteMapping = res.data.testAnalyteMapping
      this.listTestAnalyteMappingCount = res.data.count
    })
  }

  @action updateTestAnalyteMapping(testAnalyte: Models.TestAnalyteMapping) {
    this.testAnalyteMapping = testAnalyte
  }
  
  @action updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}

export default TestAnalyteMappingStore
