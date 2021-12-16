import { makeObservable, action, observable, computed } from "mobx"
import dayjs from "dayjs"
import { PatientManagerService } from "../services"
import * as Models from "../models"

export class PatientManagerStore {
  patientManger!: Models.PatientManger
  listPatientManger: Models.PatientManger[]
  listPatientMangerCount!: number
  checkExistsPatient!: boolean

  constructor() {
    this.listPatientManger = []
    this.listPatientMangerCount = 0
    this.checkExistsPatient = false
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
      filterPatientManagerList: action,
      updateExistsPatient: action,
    })
  }

  get patientManagerService() {
    return new PatientManagerService()
  }

  updatePatientManagerList(res: any) {
    if (!res.patientManagers.success) return alert(res.patientManagers.message)
    this.listPatientManger = res.patientManagers.data
    this.listPatientMangerCount = res.patientManagers.paginatorInfo.count
  }

  filterPatientManagerList(res: any) {
    this.listPatientManger = res.filterPatientManager.data
    this.listPatientMangerCount = res.filterPatientManager.paginatorInfo.count
  }

  updatePatientManager(manager: Models.PatientManger) {
    this.patientManger = manager
  }
  updateExistsPatient(flag: boolean) {
    this.checkExistsPatient = flag
  }
}
