import { makeObservable, action, observable, computed } from "mobx"
import { PatientTestService } from "../services"
import {PatientTest} from "../models"
  
export class PatientTestStore {
  patientTest!: PatientTest
  patientListTest: PatientTest[] = []
  patientListTestCount!: number   
 
//   checkExistsOrderId!: boolean
//   selectedItems!: SelectedItems
//   packageList!: any
  
  constructor() {
    this.patientListTest = []
     //this.packageList = []
     this.patientListTestCount = 0
    // this.checkExistsOrderId = false
    // this.patientTest = {
    //   ...this.patientTest,
    // }

    makeObservable<PatientTestStore, any>(this, {
      patientTest: observable,
      patientListTest: observable,
    //   patientListTestCount: observable,
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
    this.patientListTest = res.patientTests.panelTestList
    this.patientListTestCount = res.patientTests.paginatorInfo.count
  }  
       
  filterTestList(res: any) {
   
    
    this.patientListTest = res.filterPatientTest.panelTestList
    this.patientListTestCount = res.filterPatientTest.paginatorInfo.count
  }

  updateTest(input: PatientTest) {
    this.patientTest = input
  }

   
//   updateExistsOrderId(flag: boolean) {
//     this.checkExistsOrderId = flag
//   }

//   updateSelectedItems(res: SelectedItems) {
//     this.selectedItems = res
//   }

//   updatePackageList(patientList: any[]) {
//     this.packageList = patientList
//   }
}
