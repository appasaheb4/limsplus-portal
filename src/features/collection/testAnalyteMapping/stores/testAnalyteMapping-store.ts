import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
@version(0.1)
class TestAnalyteMappingStore {
  @ignore @observable testAnalyteMapping?: Models.TestAnalyteMapping
   
  constructor() {
    makeAutoObservable(this)
  }

  @computed get TestAnalyteMappingService() {
    return new Services.TestAnalyteMappingService(
      Stores.loginStore.login?.accessToken as string
    )
  }

  @action updateTestAnalyteMapping(testAnalyte: Models.TestAnalyteMapping) {
    this.testAnalyteMapping = testAnalyte
  }
}

export default TestAnalyteMappingStore
