import { makeObservable, action, observable, computed } from "mobx"
import { PatientManagerService } from "../services"
import * as Models from "../models"

export class PatientManagerStore {
  patientManger!: Models.PatientManger
  listPatientManger: Models.PatientManger[]
  listPatientMangerCount!: number

  constructor() {
    this.listPatientManger = []
    this.listPatientMangerCount = 0
    makeObservable<PatientManagerStore, any>(this, {
      patientManger: observable,
      listPatientManger: observable,
      listPatientMangerCount: observable,

      patientManagerService: computed,
      updatePatientManager: action,
    })
  }
    
  get patientManagerService() {
    return new PatientManagerService()
  }

  updatePatientManager(manager: Models.PatientManger) {
    this.patientManger = manager
  }
}
