import { makeObservable, action, observable, computed } from "mobx"
import { PatientTestService } from "../services"
import * as Models from "../models"
  
export class PatientResultStore {
  patientResultList: Models.PatientResult[] = []
  patientResultTestCount!: number   
 
 constructor() {
    this.patientResultList = []
     this.patientResultTestCount = 0

    makeObservable<PatientResultStore, any>(this, {
        patientResultList: observable,
        patientResultTestCount: observable,

        patientResultService: computed,
        updatePatientResultList: action,
        filterPatientResultList: action
    })
  }

  get patientResultService() {
    return new PatientTestService()
  }  

  updatePatientResultList(res: any) {
    if (!res.patientResults.success) return alert(res.patientResults.message)
    this.patientResultList = res.patientResults.panelTestList
    this.patientResultTestCount = res.patientResults.paginatorInfo.count
  }  
       
  filterPatientResultList(res: any) {
    this.patientResultList = res.filterPatientTest.panelTestList
    this.patientResultTestCount = res.filterPatientTest.paginatorInfo.count
  }
}
