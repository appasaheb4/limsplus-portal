import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
import * as LibraryUtils from "@lp/library/utils"
@version(0.1)
class TestAnalyteMappingStore {
  @ignore @observable testAnalyteMapping?: Models.TestAnalyteMapping
   
  constructor() {
    makeAutoObservable(this)
    this.testAnalyteMapping ={
      ...this.testAnalyteMapping,
      dateCreation: LibraryUtils.moment().unix(),
      dateActive: LibraryUtils.moment().unix(),
      version: 1,
      keyNum: "1",
      enteredBy: Stores.loginStore.login?._id,
    }
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
