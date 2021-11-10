import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as ModelsSection from "@lp/features/collection/section/models"
@version(0.1)
export class TestMasterStore {
  @ignore @observable testMaster!: Models.TestMaster
  @observable listTestMaster!: Models.TestMaster[]
  @observable listTestMasterCount!: number
  @ignore @observable checkExitsLabEnvCode!: boolean
  @observable sectionListByDeptCode!: ModelsSection.Section[]

  constructor() {
    this.listTestMaster = []
    this.sectionListByDeptCode = []
    this.checkExitsLabEnvCode = false
    this.testMaster = {
      ...this.testMaster,
      dateCreation: new Date(),
      dateActiveFrom: new Date(),
      dateActiveTo: new Date(),
      version: 1,
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
      validationLevel:0
    }
    makeObservable<TestMasterStore, any>(this, {
      testMaster: observable,
      listTestMaster: observable,
      listTestMasterCount: observable,
      checkExitsLabEnvCode: observable,
      sectionListByDeptCode: observable,
    })
  }

  @computed get testMasterService() {
    return new Services.TestMasterService()
  }

  @action fetchTestMaster(page?, limit?) {
    this.testMasterService.listTestMaster(page, limit)
  }

  @action updateTestMasterList(res: any) {
    if (!res.testMasters.success) return alert(res.testMasters.message)
    this.listTestMaster = res.testMasters.data
    this.listTestMasterCount = res.testMasters.paginatorInfo.count
  }

  @action findSectionListByDeptCode = (code: string) => {
    this.testMasterService.findSectionListByDeptCode(code)
  }

  @action updateSectionListByDeptCode(res: any) {
    if (!res.findSectionListByDeptCode.success)
      return alert(`${res.findSectionListByDeptCode.message}`)
    this.sectionListByDeptCode = res.findSectionListByDeptCode.data
  }

  @action updateTestMaster(test: Models.TestMaster) {
    this.testMaster = test
  }

  @action updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}
