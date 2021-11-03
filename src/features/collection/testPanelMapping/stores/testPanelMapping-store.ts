import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

@version(0.1)
export class TestPanelMappingStore {
  @ignore @observable testPanelMapping!: Models.TestPanelMapping
  @observable listTestPanelMapping: Models.TestPanelMapping[]
  @observable listTestPanelMappingCount: number
  @ignore @observable checkExitsLabEnvCode!: boolean

  constructor() {
    this.listTestPanelMapping = []
    this.listTestPanelMappingCount = 0
    this.checkExitsLabEnvCode = false
    this.testPanelMapping = {
      ...this.testPanelMapping,
      dateCreation: new Date(),
      dateActiveFrom: new Date(),
      dateActiveTo: new Date(),
      version: 1,
      bill: false,
    }
    makeObservable<TestPanelMappingStore, any>(this, {
      testPanelMapping: observable,
      listTestPanelMapping: observable,
      listTestPanelMappingCount: observable,
      checkExitsLabEnvCode: observable,
    })
  }

  @computed get testPanelMappingService() {
    return new Services.TestPanelMappingService()
  }

  @action fetchTestPanelMapping(page?, limit?) {
    this.testPanelMappingService.listTestPanelMapping(page, limit)
  }

  @action updateTestPanelMappingList(res: any) {
    if (!res.testPanelMappings.success) return alert(res.testPanelMappings.message)
    this.listTestPanelMapping = res.testPanelMappings.data
    this.listTestPanelMappingCount = res.testPanelMappings.paginatorInfo.count
  }
    
  @action updateTestPanelMapping(testPanel: Models.TestPanelMapping) {
    this.testPanelMapping = testPanel
  }

  @action updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}
