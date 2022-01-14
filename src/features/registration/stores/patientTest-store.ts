import { makeObservable, action, observable, computed } from "mobx"
import { PatientTestService } from "../services"
import * as Models from "../models"
  
export class PatientTestStore {
  patientTest!: Models.Test
  listTest: Models.Test[] = []
     listTestCount!: number
//   checkExistsOrderId!: boolean
//   selectedItems!: Models.SelectedItems
//   packageList!: any

  constructor() {
    this.listTest = []
     //this.packageList = []
     this.listTestCount = 0
    // this.checkExistsOrderId = false
    // this.patientTest = {
    //   ...this.patientTest,
    // }

    makeObservable<PatientTestStore, any>(this, {
      patientTest: observable,
      listTest: observable,
    //   listTestCount: observable,
    //   selectedItems: observable,
    //   packageList: observable,

      patientTestService: computed,
      updateTestList: action,
      filterTestList: action,
      updateTest: action,
    //   updateSelectedItems: action,
    //   updatePackageList: action,
    })
  }

  get patientTestService() {
    return new PatientTestService()
  }

  updateTestList(res: any) {
    if (!res.patientTests.success) return alert(res.patientTests.message)
    this.listTest = res.patientTests.data
    this.listTestCount = res.patientTests.paginatorInfo.count
  }
    
  filterTestList(res: any) {
    this.listTest = res.filterTest.data
    this.listTestCount = res.filterTest.paginatorInfo.count
  }

  updateTest(input: Models.Test) {
    this.patientTest = input
  }

//   updateExistsOrderId(flag: boolean) {
//     this.checkExistsOrderId = flag
//   }

//   updateSelectedItems(res: Models.SelectedItems) {
//     this.selectedItems = res
//   }

//   updatePackageList(list: any[]) {
//     this.packageList = list
//   }
}
