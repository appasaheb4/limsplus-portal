import { makeObservable, action, observable, computed } from "mobx"
import * as Models from "../models"
import * as Services from "../services"
import * as ModelsSection from "@lp/features/collection/section/models"


export class TestMasterStore {
  testMaster!: Models.TestMaster
  listTestMaster!: Models.TestMaster[]
  listTestMasterCopy!: Models.TestMaster[]
  listTestMasterCount!: number
  checkExitsLabEnvCode!: boolean
  sectionListByDeptCode!: ModelsSection.Section[]

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
      validationLevel: 0,
    }
    makeObservable<TestMasterStore, any>(this, {
      testMaster: observable,
      listTestMaster: observable,
      listTestMasterCount: observable,
      checkExitsLabEnvCode: observable,
      sectionListByDeptCode: observable,

      testMasterService: computed,
      fetchTestMaster: action,
      updateTestMasterList: action,
      findSectionListByDeptCode: action,
      updateSectionListByDeptCode: action,
      updateTestMaster: action,
      updateExistsLabEnvCode: action,
      filterTestMasterList: action,
    })  
  }

   get testMasterService() {
    return new Services.TestMasterService()
  }

   fetchTestMaster(page?, limit?) {
    this.testMasterService.listTestMaster(page, limit)
  }

   updateTestMasterList(res: any) {
     if(!Array.isArray(res)){
      if (!res.testMasters.success) return alert(res.testMasters.message)
    this.listTestMaster = res.testMasters.data
    this.listTestMasterCopy = res.testMasters.data
    this.listTestMasterCount = res.testMasters.paginatorInfo.count
     }else{
       this.listTestMaster = res
     }
    
  }

  filterTestMasterList(res: any) {
    this.listTestMaster = res.filterTestMaster.data
    this.listTestMasterCount = res.filterTestMaster.paginatorInfo.count
  }

   findSectionListByDeptCode = (code: string) => {
    this.testMasterService.findSectionListByDeptCode(code)
  }

   updateSectionListByDeptCode(res: any) {
    if (!res.findSectionListByDeptCode.success)
      return alert(`${res.findSectionListByDeptCode.message}`)
    this.sectionListByDeptCode = res.findSectionListByDeptCode.data
  }

   updateTestMaster(test: Models.TestMaster) {
    this.testMaster = test
  }

   updateExistsLabEnvCode = (status: boolean) => {
    this.checkExitsLabEnvCode = status
  }
}
