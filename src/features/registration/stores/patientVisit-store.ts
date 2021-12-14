import { makeObservable, action, observable, computed } from "mobx"
import dayjs from "dayjs"
import { PatientManagerService } from "../services"
import * as Models from "../models"

export class PatientVisitStore {
  patientVisit!: Models.PatientVisit
  listPatientVisit: Models.PatientVisit[] = []
  listPatientVisitCount!: number

  constructor() {
    this.listPatientVisit = []
    this.listPatientVisitCount = 0
    this.patientVisit = {
      ...this.patientVisit,
      birthDate: new Date(dayjs(new Date()).add(-30, "years").format("YYYY-MM-DD")),
    }
  
    makeObservable<PatientVisitStore, any>(this, {
      patientVisit: observable,
      listPatientVisit: observable,
      listPatientVisitCount: observable,

      patientVisitService: computed,
      updatePatientVisitList: action,
      filterPatientVisitList: action,
      updatePatientVisit: action,
    })
  }

  get patientVisitService() {
    return new PatientManagerService()
  }

  updatePatientVisitList(res: any) {
    if (!res.patientManagers.success) return alert(res.patientManagers.message)
    this.listPatientVisit = res.patientManagers.data
    this.listPatientVisitCount = res.patientManagers.paginatorInfo.count
  }

  filterPatientVisitList(res: any) {
    this.listPatientVisit = res.filterPatientManager.data
    this.listPatientVisitCount = res.filterPatientManager.paginatorInfo.count
  }

  updatePatientVisit(input: Models.PatientVisit) {
    this.patientVisit = input
  }
}
