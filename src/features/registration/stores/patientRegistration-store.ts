import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Services from "../services"
import * as Models from "../models"

@version(0.1)
class PatientRegistrationStore {
  @ignore @observable patientManger?: Models.PatientManger
  @ignore @observable patientVisit?: Models.PatientVisit
  @ignore @observable patientOrder?: Models.PatientOrder
  @ignore @observable patientResult?: Models.PatientResult
  @ignore @observable informationGroup?: Models.InformationGroup
  @ignore @observable patientSample?: Models.PatientSample
  @ignore @observable specialResult?: Models.SpecialResult
  @observable listPatientManger?: Models.PatientManger[] = []
  @observable listPatientVisit?: Models.PatientVisit[] = []
  @observable listPatientOrder?: Models.PatientOrder[] = []
  @observable listPatientSample?: Models.PatientSample[] = []
  @observable listPatientResult?: Models.PatientResult[] = []
  @observable extraDataListPatientResult?: Models.PatientResult[] = []
  @observable extraDatListPatientManger?: Models.PatientManger[] = []
  @observable extraDatListPatientVisit?: Models.PatientVisit[] = []
  @observable listInformationGroup?: Models.InformationGroup[] = []
  @observable listSpecialResult?: Models.SpecialResult[] = []
  @observable listPatientOrderCount: number = 0
  @observable listPatientMangerCount: number = 0
  @observable listPatientVisitCount: number = 0
  @observable listPatientSampleCount: number = 0
  @observable listPatientResultCount: number = 0
  @observable listInformationGroupCount: number = 0
  @observable listSpecialResultCount: number = 0
  @observable extraDataListPatientResultCount: number = 0
  @observable extraDataListPatientManagerCount: number = 0
  @observable extraDataListPatientVisitCount: number = 0
  
  
 
  

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
  @action updateInformationGroup(info: Models.InformationGroup){
    this.informationGroup = info
  }
  @action updatePatientSample(sample: Models.PatientSample){
    this.patientSample = sample
  }
  @action updatePatientResult(result: Models.PatientResult){
      this.patientResult = result
  }
  @action updateSpecialResult(result: Models.SpecialResult){
      this.specialResult = result
  }
}
export default PatientRegistrationStore
