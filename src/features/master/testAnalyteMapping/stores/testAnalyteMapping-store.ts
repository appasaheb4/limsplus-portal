import { version } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import { TestAnalyteMapping, SelectedItems } from "../models"
import { TestAnalyteMappingService } from "../services"
import dayjs from "dayjs"

@version(0.1)
export class TestAnalyteMappingStore {
  testAnalyteMapping!: TestAnalyteMapping
  listTestAnalyteMapping!: TestAnalyteMapping[]
  listTestAnalyteMappingCopy!: TestAnalyteMapping[]
  listTestAnalyteMappingCount: number = 0
  checkExitsLabEnvCode?: boolean = false
  selectedItems!: SelectedItems

  constructor() {
    this.listTestAnalyteMapping = []
    this.testAnalyteMapping = {
      ...this.testAnalyteMapping,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")),
      version: 1,
      bill: false,
    }
    makeObservable<TestAnalyteMappingStore, any>(this, {
      testAnalyteMapping: observable,
      listTestAnalyteMapping: observable,
      listTestAnalyteMappingCopy: observable,
      listTestAnalyteMappingCount: observable,
      checkExitsLabEnvCode: observable,
      selectedItems: observable,

      testAnalyteMappingService: computed,
      fetchTestAnalyteMapping: action,
      updateTestAnalyteMappingList: action,
      updateTestAnalyteMapping: action,
      updateExistsLabEnvCode: action,
      filterTestAnalyteMappingList: action,
    })
  }
  get testAnalyteMappingService() {
    return new TestAnalyteMappingService()
  }

  fetchTestAnalyteMapping(page?, limit?) {
    this.testAnalyteMappingService.listTestAnalyteMapping(page, limit)
  }

  updateTestAnalyteMappingList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.testAnalyteMappings.success)
        return alert(res.testAnalyteMappings.message)
      this.listTestAnalyteMapping = res.testAnalyteMappings.data
      this.listTestAnalyteMappingCopy = res.testAnalyteMappings.data
      this.listTestAnalyteMappingCount = res.testAnalyteMappings.paginatorInfo.count
    } else {
      this.listTestAnalyteMapping = res
    }
  }

  filterTestAnalyteMappingList(res: any) {
    this.listTestAnalyteMapping = res.filterTestAnalyteMappings.data
    this.listTestAnalyteMappingCount =
      res.filterTestAnalyteMappings.paginatorInfo.count
  }

  updateTestAnalyteMapping(testAnalyte: TestAnalyteMapping) {
    this.testAnalyteMapping = testAnalyte
  }

  updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
  updateSelectedItems(items: SelectedItems | undefined) {
    if (items) this.selectedItems = items
    else this.selectedItems = new SelectedItems({})
  }
}
