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
  @observable listTestPanelMappingCount: number = 0 
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
    )
  }

  @action fetchTestPanelMapping(page?,limit?) {
    this.testPanelMappingService.listTestPanelMapping(page,limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.listTestPanelMapping = res.data.testPanelMapping
      this.listTestPanelMappingCount = res.data.count
    })
  }

  @action updateTestPanelMapping(testPanel: Models.TestPanelMapping) {
    this.testPanelMapping = testPanel
  }
}

export default TestPanelMappingStore
