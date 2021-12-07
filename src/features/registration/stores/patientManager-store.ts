import { makeObservable, action, observable, computed } from "mobx"
import dayjs from "dayjs"
import { PatientManagerService } from "../services"
import * as Models from "../models"

export class PatientManagerStore {
  patientManger!: Models.PatientManger
  listPatientManger: Models.PatientManger[]
  listPatientMangerCount!: number

  constructor() {
    this.listPatientManger = []
    this.listPatientMangerCount = 0
    this.patientManger = {
      ...this.patientManger,
      birthDate: new Date(dayjs(new Date()).add(-30, "years").format("YYYY-MM-DD")),
    }
    makeObservable<PatientManagerStore, any>(this, {
      patientManger: observable,
      listPatientManger: observable,
      listPatientMangerCount: observable,

      patientManagerService: computed,
      updatePatientManagerList: action,
      updatePatientManager: action,
    })
  }
  
  get patientManagerService() {
    return new PatientManagerService()
  } 
           
  updatePatientManagerList(res: any) {
    console.log({res});
    
    if (!res.patientManagers.success) return alert(res.patientManagers.message)
    this.listPatientManger = res.patientManagers.data
    this.listPatientMangerCount = res.patientManagers.paginatorInfo.count
  }
   
  updatePatientManager(manager: Models.PatientManger) {
    this.patientManger = manager
  }
}
