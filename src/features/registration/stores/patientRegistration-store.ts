import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Services from "../services"
import * as Models from "../models"

@version(0.1)
class PatientRegistrationStore {
  @ignore @observable patientManger?: Models.PatientManger
  @observable listPatientManger?: Models.PatientManger[] = []
  @observable listPatientMangerCount: number = 0
  @ignore @observable patientVisit?: Models.PatientVisit
  @ignore @observable patientOrder?: Models.PatientOrder

  constructor() {
    makeAutoObservable(this)
  }

  @computed get PatientRegistartionService() {
    return new Services.PatientRegistrationService(
    )
  }

  @action updatePatientManager(manager: Models.PatientManger) {
    this.patientManger = manager
  }
  
  @action updatePatientVisit(visit: Models.PatientVisit) {
    this.patientVisit = visit
  }
  @action updatePatientOrder(order: Models.PatientOrder) {
    this.patientOrder = order
  }
}
export default PatientRegistrationStore
