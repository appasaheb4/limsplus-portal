import { makeObservable, action, observable, computed } from "mobx"
import { PatientResultService } from "../services"
import {PatientResult} from "../models"
  
export class PatientResultStore {
  patientResultList: PatientResult[] = []
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
    return new PatientResultService()
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
