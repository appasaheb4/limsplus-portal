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

export class PatientResult {
  patientOrder?: string
  visitId?: string
  pLab?: string
  testCode?: string
  testName?: string
  sorter?: string
  analyteCode?: string
  analyteName?: string
  department?: string
  section?: string
  resultType?: string
  rawValue?: string
  alpha?: string
  value?: string
  result?: string
  units?: string
  resultDate?: Date
  releaseDate?: Date
  abNormal?: boolean
  critical?: boolean
  hold?: boolean
  status?: string
  enteredBy?: string
  analyteType?: string
  picture?: string
  testVersion?: string
  analyteVersion?: string
  calcFlag?: boolean
  calciName?: string
  calculation?: string
  formula?: string
  reTest?: boolean
  reRun?: boolean
  dilutionValue?: string
  repitation?: string
  instrumentType?: string
  instrumentId?: string
  instrumentResult?: string
  analyzedDate?: Date
  instrumentUnit?: string
  confidental?: boolean
  workFlow?: boolean
  attachment?: boolean
  lonicCode?: string
  price?: number
  resultReportable?: boolean
  rangeReportable?: boolean
  pLaterUnno?: string
  runno?: string
  cupno?: string
  species?: string
  deltaFlag?: string
  deltaValue?: string
  qcFlag?: string
  qcStatus?: string
  byPassEln?: string
  color?: string
  environment?: string
  constructor(rawData: { [key in string]: any }) {
    this.patientOrder = rawData.patientOrder
    this.visitId = rawData.visitId
    this.pLab = rawData.pLab
    this.testCode = rawData.testCode
    this.testName = rawData.testName
    this.sorter = rawData.sorter
    this.analyteCode = rawData.analyteCode
    this.analyteName = rawData.analyteName
    this.department = rawData.department
    this.section = rawData.section
    this.resultType = rawData.resultType
    this.rawValue = rawData.rawValue
    this.alpha = rawData.alpha
    this.value = rawData.value
    this.result = rawData.result
    this.units = rawData.units
    this.resultDate = rawData.resultDate
    this.releaseDate = rawData.releaseDate
    this.abNormal = rawData.abNormal
    this.critical = rawData.critical
    this.hold = rawData.hold
    this.status = rawData.status
    this.enteredBy = rawData.enteredBy
    this.analyteType = rawData.analyteType
    this.picture = rawData.picture
    this.testVersion = rawData.testVersion
    this.analyteVersion = rawData.analyteVersion
    this.calcFlag = rawData.calcFlag
    this.calciName = rawData.calciName
    this.calculation = rawData.calculation
    this.formula = rawData.formula
    this.reTest = rawData.reTest
    this.reRun = rawData.reRun
    this.dilutionValue = rawData.dilutionValue
    this.repitation = rawData.repitation
    this.instrumentType = rawData.instrumentType
    this.instrumentId = rawData.instrumentId
    this.instrumentResult = rawData.instrumentResult
    this.analyzedDate = rawData.analyzedDate
    this.instrumentUnit = rawData.instrumentUnit
    this.confidental = rawData.confidental
    this.workFlow = rawData.workFlow
    this.attachment = rawData.attachment
    this.lonicCode = rawData.lonicCode
    this.price = rawData.price
    this.resultReportable = rawData.resultReportable
    this.rangeReportable = rawData.rangeReportable
    this.pLaterUnno = rawData.pLaterUnno
    this.runno = rawData.runno
    this.cupno = rawData.cupno
    this.species = rawData.species
    this.deltaFlag = rawData.deltaFlag
    this.deltaValue = rawData.deltaValue
    this.qcFlag = rawData.qcFlag
    this.qcStatus = rawData.qcStatus
    this.byPassEln = rawData.byPassEln
    this.color = rawData.color
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
