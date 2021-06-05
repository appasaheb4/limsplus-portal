import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import { Stores } from "@lp/features/login/stores"
@version(0.1)
class TestMasterStore {
  @ignore @observable testMaster?: Models.TestMaster

  constructor() {
    makeAutoObservable(this)
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
