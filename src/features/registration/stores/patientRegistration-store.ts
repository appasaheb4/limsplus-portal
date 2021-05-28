import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Services from "../services"
import * as Models from "../models"

import { Stores } from "@lp/features/login/stores"

@version(0.1)
class PatientRegistrationStore {
  @ignore @observable patientManger?: Models.PaientManger

  constructor() {
    makeAutoObservable(this)
  }
  @computed get PatientRegistartionService() {
    return new Services.PatientRegistrationService(
      Stores.loginStore.login?.accessToken as string
    )
  }
  @action updatePatientManager(patient: Models.PaientManger) {
    this.patientManger = patient
  }
}
export default PatientRegistrationStore
