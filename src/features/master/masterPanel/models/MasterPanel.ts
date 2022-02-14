export class MasterPanel {
  _id: string
  existsVersionId: string
  existsRecordId: string
  dateCreation: Date
  dateActive: Date
  dateExpire: Date
  version: number
  enteredBy: string
  rLab: string
  pLab: string
  department: string
  section: Record<string, any>
  panelCode: string
  panelName: string
  panelMethodCode: string
  panelMethodName: string
  description: string
  shortName: string
  bill: boolean
  price: number
  schedule: string
  autoRelease: boolean
  holdOOS: boolean
  validationLevel: number
  confidential: boolean
  urgent: boolean
  instantResult: boolean
  reportGroup: string
  reportOrder: number
  sex: string
  sexAction: boolean
  hiAge: string
  loAge: string
  processing: string
  category: string
  suffix: string
  serviceType: string
  panelType: string
  repitation: boolean
  tubeGroup: string
  printLabel: boolean
  labelInstruction: string
  pageBreak: boolean
  method: boolean
  panelMethod: string
  workflow: string
  cumulative: boolean
  reportTemplate: string
  sampleType: string
  specalInstructions: string
  status: string
  environment: string
  dateOfEntry: Date
  lastUpdated: Date
  
  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
    this.existsVersionId = rawData.existsVersionId
    this.existsRecordId = rawData.existsRecordId
    this.dateCreation = rawData.dateCreation
    this.dateActive = rawData.dateActive
    this.dateExpire = rawData.dateExpire
    this.version = rawData.version
    this.enteredBy = rawData.enteredBy
    this.rLab = rawData.rLab
    this.pLab = rawData.pLab
    this.department = rawData.department
    this.section = rawData.section
    this.panelCode = rawData.panelCode
    this.panelName = rawData.panelName
    this.panelMethodCode = rawData.panelMethodCode
    this.panelMethodName = rawData.panelMethodName
    this.description = rawData.description
    this.shortName = rawData.shortName
    this.bill = rawData.bill
    this.price = rawData.price
    this.schedule = rawData.schedule
    this.autoRelease = rawData.autoRelease
    this.holdOOS = rawData.holdOOS
    this.validationLevel = rawData.validationLevel
    this.confidential = rawData.confidential
    this.urgent = rawData.urgent
    this.instantResult = rawData.instantResult
    this.reportGroup = rawData.reportGroup
    this.reportOrder = rawData.reportOrder
    this.sex = rawData.sex
    this.sexAction = rawData.sexAction
    this.hiAge = rawData.hiAge
    this.loAge = rawData.loAge
    this.method = rawData.method
    this.panelMethod = rawData.panelMethod
    this.processing = rawData.processing
    this.category = rawData.category
    this.suffix = rawData.suffix
    this.serviceType = rawData.serviceType
    this.panelType = rawData.panelType
    this.repitation = rawData.repitation
    this.tubeGroup = rawData.tubeGroup
    this.printLabel = rawData.printLabel
    this.labelInstruction = rawData.labelInstruction
    this.pageBreak = rawData.pageBreak
    this.workflow = rawData.workflow
    this.cumulative = rawData.cumulative
    this.reportTemplate = rawData.reportTemplate
    this.sampleType = rawData.sampleType
    this.specalInstructions = rawData.specalInstructions
    this.status = rawData.status
    this.serviceType = rawData.serviceType
    this.environment = rawData.environment
    this.dateOfEntry = rawData.dateOfEntry
    this.lastUpdated = rawData.lastUpdated
  }
}  
