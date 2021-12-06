import { makeObservable, action, observable, computed } from "mobx"
import * as Services from "../services"
import * as Models from "../models"

class PatientRegistrationStore {
  patientManger!: Models.PatientManger
  patientVisit?: Models.PatientVisit
  patientOrder?: Models.PatientOrder
  patientResult?: Models.PatientResult
  informationGroup?: Models.InformationGroup
  patientSample?: Models.PatientSample
  specialResult?: Models.SpecialResult
  listPatientManger?: Models.PatientManger[] = []
  listPatientVisit?: Models.PatientVisit[] = []
  listPatientOrder?: Models.PatientOrder[] = []
  listPatientSample?: Models.PatientSample[] = []
  listPatientResult?: Models.PatientResult[] = []
  extraDataListPatientResult?: Models.PatientResult[] = []
  extraDatListPatientManger?: Models.PatientManger[] = []
  extraDatListPatientVisit?: Models.PatientVisit[] = []
  listInformationGroup?: Models.InformationGroup[] = []
  listSpecialResult?: Models.SpecialResult[] = []
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
    return new Services.PatientRegistrationService()
  }

  updatePatientManager(manager: Models.PatientManger) {
    this.patientManger = manager
  }

  updatePatientVisit(visit: Models.PatientVisit) {
    this.patientVisit = visit
  }
  updatePatientOrder(order: Models.PatientOrder) {
    this.patientOrder = order
  }
  updateInformationGroup(info: Models.InformationGroup) {
    this.informationGroup = info
  }
  updatePatientSample(sample: Models.PatientSample) {
    this.patientSample = sample
  }
  updatePatientResult(result: Models.PatientResult) {
    this.patientResult = result
  }
  updateSpecialResult(result: Models.SpecialResult) {
    this.specialResult = result
  }
}
export default PatientRegistrationStore
