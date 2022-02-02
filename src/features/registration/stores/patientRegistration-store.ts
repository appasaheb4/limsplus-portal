import { makeObservable, action, observable, computed } from "mobx"
import {PatientRegistrationService} from "../services"
import {PatientOrder,PatientManger,PatientResult,PatientSample,PatientVisit,SpecialResult,InformationGroup} from "../models"

class PatientRegistrationStore {
  patientManger!: PatientManger
  patientVisit!: PatientVisit
  patientOrder?: PatientOrder
  patientResult?: PatientResult
  informationGroup?: InformationGroup
  patientSample?: PatientSample
  specialResult?: SpecialResult
  listPatientManger?: PatientManger[] = []  
  listPatientVisit?: PatientVisit[] = []
  listPatientOrder?: PatientOrder[] = []
  listPatientSample?: PatientSample[] = []
  listPatientResult?: PatientResult[] = []
  extraDataListPatientResult?: PatientResult[] = []
  extraDatListPatientManger?: PatientManger[] = []
  extraDatListPatientVisit?: PatientVisit[] = []
  listInformationGroup?: InformationGroup[] = []
  listSpecialResult?: SpecialResult[] = []
  listPatientOrderCount: number = 0
  listPatientMangerCount: number = 0
  listPatientVisitCount: number = 0
  listPatientSampleCount: number = 0
  listPatientResultCount: number = 0
  listInformationGroupCount: number = 0
  listSpecialResultCount: number = 0
  extraDataListPatientResultCount: number = 0
  extraDataListPatientManagerCount: number = 0
  extraDataListPatientVisitCount: number = 0

  constructor() {
    makeObservable<PatientRegistrationStore, any>(this, {
      patientManger: observable,

      PatientRegistartionService: computed,
      updatePatientVisit: action,
    })
  }

  get PatientRegistartionService() {
    return new PatientRegistrationService()
  }

  updatePatientManager(manager: PatientManger) {
    this.patientManger = manager
  }

  updatePatientVisit(visit: PatientVisit) {
    this.patientVisit = visit
  }
  updatePatientOrder(order: PatientOrder) {
    this.patientOrder = order
  }
  updateInformationGroup(info: InformationGroup) {
    this.informationGroup = info
  }
  updatePatientSample(sample: PatientSample) {
    this.patientSample = sample
  }
  updatePatientResult(result: PatientResult) {
    this.patientResult = result
  }
  updateSpecialResult(result: SpecialResult) {
    this.specialResult = result
  }
}
export default PatientRegistrationStore
