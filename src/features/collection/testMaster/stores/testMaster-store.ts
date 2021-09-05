import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as LibraryUtils from "@lp/library/utils"
import { Stores as LoginStores } from "@lp/features/login/stores"

@version(0.1)
class TestMasterStore {
  @ignore @observable testMaster?: Models.TestMaster
  @observable listTestMaster?: Models.TestMaster[] = []
  @observable listTestMasterCount: number = 0
  @ignore @observable checkExitsLabEnvCode?: boolean = false

  constructor() {
    makeAutoObservable(this)
    this.testMaster = {
      ...this.testMaster,
      dateCreation: LibraryUtils.moment().unix(),
      dateActiveFrom: LibraryUtils.moment().unix(),
      dateActiveTo: LibraryUtils.moment().unix(),
      version: 1,
      keyNum: "1",
      rLab: LoginStores.loginStore.login?.lab,
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
    return new Services.TestMasterService()
  }

  @action fetchTestMaster(page?, limit?) {
    this.testMasterService.listTestMaster(page, limit).then((res) => {
      if (!res.success) return alert(res.message)
      //console.log({ res })
      this.listTestMaster = res.data.testMaster
      this.listTestMasterCount = res.data.count
    })
  }

  @action updateTestMaster(test: Models.TestMaster) {
    this.testMaster = test
  }   
  
  @action updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}

export default TestMasterStore
