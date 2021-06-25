import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"

import { Stores } from "@lp/features/login/stores"
import { Stores as LoginStores } from "@lp/features/login/stores"


@version(0.1)
class TestMasterStore {
  @ignore @observable testMaster?: Models.TestMaster
  @observable listTestMaster?: Models.TestMaster[] =[]

  constructor() {
    makeAutoObservable(this)
    this.testMaster = {
      ...this.testMaster,
      dateCreation: LibraryUtils.moment().unix(),
      dateActive: LibraryUtils.moment().unix(),
      version: 1,
      keyNum: "1",
      enteredBy: Stores.loginStore.login?._id,
      rLab:LoginStores.loginStore.login?.lab,
      bill: false,
      autoFinish: false,
      holdOOS: false,
      confidential: false,
      urgent: false,
      instantResult: false,
      accredited: false,
      cretical: false,
      repitation: false,
      printLabel: false,
      method: false,
      cumulative: false,
      qcHold: false,
      oosHold: false,
      deltaHold: false,
      allowPartial: false,
    }
  }

  @computed get testMasterService() {
    return new Services.TestMasterService(
      Stores.loginStore.login?.accessToken as string
    )
  }

  fetchTestMaster() {
    this.testMasterService.listTestMaster().then((res) => {
      console.log({ res })
      this.listTestMaster = res
    })
  }

  @action updateTestMaster(test: Models.TestMaster) {
    this.testMaster = test
  }
}

export default TestMasterStore
