import { version } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import dayjs from "dayjs"

@version(0.1)
export class TestPanelMappingStore {
  testPanelMapping!: Models.TestPanelMapping
  listTestPanelMapping: Models.TestPanelMapping[]
  listTestPanelMappingCount: number
  checkExitsLabEnvCode!: boolean

  constructor() {
    this.listTestPanelMapping = []
    this.listTestPanelMappingCount = 0
    this.checkExitsLabEnvCode = false
    this.testPanelMapping = {
      ...this.testPanelMapping,
      dateCreation: new Date(),
      dateActiveFrom: new Date(),
      dateActiveTo: new Date(
        dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")
      ),
      version: 1,
      bill: false,
    }
    makeObservable<TestPanelMappingStore, any>(this, {
      testPanelMapping: observable,
      listTestPanelMapping: observable,
      listTestPanelMappingCount: observable,
      checkExitsLabEnvCode: observable,

      testPanelMappingService: computed,
      fetchTestPanelMapping: action,
      updateTestPanelMappingList: action,
      updateTestPanelMapping: action,
      updateExistsLabEnvCode: action,
      filterTestPanelMappingList: action
    })
  }

  get testPanelMappingService() {
    return new Services.TestPanelMappingService()
  }

  fetchTestPanelMapping(page?, limit?) {
    this.testPanelMappingService.listTestPanelMapping(page, limit)
  }

  updateTestPanelMappingList(res: any) {
    if (!res.testPanelMappings.success) return alert(res.testPanelMappings.message)
    this.listTestPanelMapping = res.testPanelMappings.data
    this.listTestPanelMappingCount = res.testPanelMappings.paginatorInfo.count
  }

  filterTestPanelMappingList(res: any) {
    this.listTestPanelMapping = res.filterTestPanelMappings.data
    this.listTestPanelMappingCount = res.filterTestPanelMappings.paginatorInfo.count
  }

  updateTestPanelMapping(testPanel: Models.TestPanelMapping) {
    this.testPanelMapping = testPanel
  }

  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}
