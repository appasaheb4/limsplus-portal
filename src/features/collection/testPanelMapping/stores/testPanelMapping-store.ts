import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
import * as LibraryUtils from "@lp/library/utils"

@version(0.1)
class TestPanelMappingStore {
  @ignore @observable testPanelMapping?: Models.TestPanelMapping
  @observable listTestPanelMapping?: Models.TestPanelMapping[] = []

  constructor() {
    makeAutoObservable(this)
    this.testPanelMapping = {
      ...this.testPanelMapping,
      dateCreation: LibraryUtils.moment().unix(),
      dateActiveFrom: LibraryUtils.moment().unix(),
      dateActiveTo: LibraryUtils.moment().unix(),
      version: 1,
      keyNum: "1",
      enteredBy: Stores.loginStore.login?._id,
      bill: false,
    }
  }

  @computed get testPanelMappingService() {
    return new Services.TestPanelMappingService(
      Stores.loginStore.login?.accessToken as string
    )
  }

  fetchTestPanelMapping() {
    this.testPanelMappingService.listTestPanelMapping().then((res) => {
      this.listTestPanelMapping = res
    })
  }

  @action updateTestPanelMapping(testPanel: Models.TestPanelMapping) {
    this.testPanelMapping = testPanel
  }
}

export default TestPanelMappingStore
