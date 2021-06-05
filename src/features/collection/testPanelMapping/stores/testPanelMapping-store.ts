import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
@version(0.1)
class TestPanelMappingStore {
  @ignore @observable testPanelMapping?: Models.TestPanelMapping
   
  constructor() {
    makeAutoObservable(this)
  }

  @computed get TestPanelMappingService() {
    return new Services.TestPanelMappingService(
      Stores.loginStore.login?.accessToken as string
    )
  }

  @action updateTestPanelMapping(testPanel: Models.TestPanelMapping) {
    this.testPanelMapping = testPanel
  }
}

export default TestPanelMappingStore
