import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"

export class TestSampleMappingStore {
  listTestSampleMapping: Models.TestSampleMapping[]
  listTestSampleMappingCount: number
  localInput!: Models.LocalInput
  testSampleMapping!: Models.TestSampleMapping
  checkExitsTestSampleEnvCode: boolean
  departments: any

  constructor() {
    this.listTestSampleMapping = []
    this.listTestSampleMappingCount = 0
    this.checkExitsTestSampleEnvCode = false
    this.localInput = new Models.LocalInput({})
    this.testSampleMapping = {
      ...this.testSampleMapping,
      primaryContainer: false,
      uniqueContainer: false,
      centerIfuge: false,
      aliquot: false,
      labSpecfic: false,
      departmentSpecfic: false,
      sharedSample: false,
      printLabels: false,
    }

    makeObservable<TestSampleMappingStore, any>(this, {
      listTestSampleMapping: observable,
      listTestSampleMappingCount: observable,
      testSampleMapping: observable,
      checkExitsTestSampleEnvCode: observable,
      departments: observable,
      localInput: observable,

      testSampleMappingService: computed,
      fetchSampleTypeList: action,
      updateTestSampleMappingList: action,
      updateSampleType: action,
      updateLocalInput: action,
      updateExitsTestSampleEnvCode: action,
      filterTestSampleMappingList: action,
      updateDepartments: action,
    })
  }

  get testSampleMappingService() {
    return new Services.TestSampleMappingService()
  }

  fetchSampleTypeList(page?, limit?) {
    this.testSampleMappingService.listTestSampleMapping(page, limit)
  }

  updateTestSampleMappingList(res: any) {
    if (!res.testSampleMappings.success) return alert(res.testSampleMappings.message)
    this.listTestSampleMapping = res.testSampleMappings.data
    this.listTestSampleMappingCount = res.testSampleMappings.paginatorInfo.count
  }

  filterTestSampleMappingList(res: any) {
    this.listTestSampleMapping = res.filterTestSampleMappings.data
    this.listTestSampleMappingCount =
      res.filterTestSampleMappings.paginatorInfo.count
  }

  updateSampleType = (sampleMapping: Models.TestSampleMapping) => {
    this.testSampleMapping = sampleMapping
  }

  updateExitsTestSampleEnvCode = (status: boolean) => {
    this.checkExitsTestSampleEnvCode = status
  }

  updateDepartments = (department: any) => {
    this.departments = department
  }
  updateLocalInput(input: Models.LocalInput) {
    this.localInput = input
  }
}
