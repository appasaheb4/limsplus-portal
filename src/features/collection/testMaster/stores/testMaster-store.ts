import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
import * as LibraryUtils from "@lp/library/utils"
@version(0.1)
class TestMasterStore {
  @ignore @observable testMaster?: Models.TestMaster

  constructor() {
    makeAutoObservable(this)
    this.testMaster = {
      ...this.testMaster,
      dateCreation: LibraryUtils.moment().unix(),
      dateActive: LibraryUtils.moment().unix(),
      version: 1,
      keyNum: "1",
      enteredBy: Stores.loginStore.login?._id,
    }
  }

  @computed get TestMasterService() {
    return new Services.TestMasterService(
      Stores.loginStore.login?.accessToken as string
    )
  }    

  @action updateTestMaster(test: Models.TestMaster) {
    this.testMaster = test
  }
}

export default TestMasterStore
