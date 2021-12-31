import { makeObservable, action, observable, computed } from "mobx"
import { PatientVisitService } from "../services"
import * as Models from "../models"

export class PatientVisitStore {
  patientVisit!: Models.PatientVisit
  listPatientVisit: Models.PatientVisit[] = []
  listPatientVisitCopy: Models.PatientVisit[] = []
  listPatientVisitCount!: number
  checkExistsVisitId!: boolean

  constructor() {
    this.listPatientVisit = []
    this.listPatientVisitCopy = []
    this.listPatientVisitCount = 0
    this.checkExistsVisitId = false
    this.patientVisit = {
      ...this.patientVisit,
      visitDate: new Date(),
      registrationDate: new Date(),
      collectionDate: new Date(),
    }

    makeObservable<PatientVisitStore, any>(this, {
      patientVisit: observable,
      listPatientVisit: observable,
      listPatientVisitCopy: observable,
      listPatientVisitCount: observable,

      patientVisitService: computed,
      updatePatientVisitList: action,
      filterPatientVisitList: action,
      updatePatientVisit: action,
    })
  }

  get patientVisitService() {
    return new PatientVisitService()
  }

  updatePatientVisitList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.patientVisits.success) return alert(res.patientVisits.message)
      this.listPatientVisit = res.patientVisits.data
      this.listPatientVisitCopy = res.patientVisits.data
      this.listPatientVisitCount = res.patientVisits.paginatorInfo.count
    } else {
      this.listPatientVisit = res
    }
  }   

  filterPatientVisitList(res: any) {
    this.listPatientVisit = res.filterPatientVisit.data
    this.listPatientVisitCount = res.filterPatientVisit.paginatorInfo.count
  }

  updatePatientVisit(input: Models.PatientVisit) {
    this.patientVisit = input
  }

  updateExistsVisitId(flag: boolean) {
    this.checkExistsVisitId = flag
  }
}
