export class InformationGroup {
  infoDate?: Date
  infoRelatedTo?: string
  keyField?: string
  infoType?: string
  infoLookup?: boolean
  lookupValue?: string
  information?: string
  attachment?: string
  environment?: string
  enteredBy?: string
  status?: string
  constructor(rawData: { [key in string]: any }) {
    this.infoDate = rawData.infoDate
    this.infoRelatedTo = rawData.infoRelatedTo
    this.keyField = rawData.keyField
    this.infoType = rawData.infoType
    this.infoLookup = rawData.infoLookup
    this.lookupValue = rawData.lookupValue
    this.information = rawData.information
    this.attachment = rawData.attachment
    this.environment = rawData.environment
    this.enteredBy = rawData.enteredBy
    this.status = rawData.status
  }
}

export class PatientSample {
  specimenId?: string
  pLab?: string
  rLab?: string
  outSourceLab?: string
  outSourceStatus?: string
  department?: string
  section?: string
  containerId?: string
  sampleType?: string
  receivedDate?: Date
  collectionDate?: Date
  methodCollection?: string
  dateCollection?: Date
  collectedBy?: string
  panelList?: string
  dueDate?: string
  status?: string
  environment?: string
  constructor(rawData: { [key in string]: any }) {
    this.specimenId = rawData.specimenId
    this.pLab = rawData.pLab
    this.rLab = rawData.rLab
    this.outSourceLab = rawData.outSourceLab
    this.outSourceStatus = rawData.outSourceStatus
    this.department = rawData.department
    this.section = rawData.section
    this.containerId = rawData.containerId
    this.sampleType = rawData.sampleType
    this.receivedDate = rawData.receivedDate
    this.collectionDate = rawData.collectionDate
    this.methodCollection = rawData.methodCollection
    this.dateCollection = rawData.dateCollection
    this.collectedBy = rawData.collectedBy
    this.panelList = rawData.panelList
    this.dueDate = rawData.dueDate
    this.status = rawData.status
    this.environment = rawData.environment
  }
}

export class SpecialResult {
  visitId?: string
  patientResult?: string
  analyteCode?: string
  resultType?: string
  lineNo?: string
  resultTest?: string
  ruler?: string
  abNormal?: boolean
  enteredBy?: string
  environment?: string
  constructor(rawData: { [key in string]: any }) {
    this.visitId = rawData.visitID
    this.patientResult = rawData.patientResult
    this.analyteCode = rawData.analyteCode
    this.resultType = rawData.resultType
    this.lineNo = rawData.lineNo
    this.resultTest = rawData.resultTest
    this.ruler = rawData.ruler
    this.abNormal = rawData.abNormal
    this.enteredBy = rawData.enteredBy
    this.environment = rawData.environment
  }
}
