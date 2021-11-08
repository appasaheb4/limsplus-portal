export class MasterAnalyte {
  _id: string
  existsVersionId: string
  existsRecordId: string
  dateCreation: Date
  dateActiveFrom: Date
  dateActiveTo: Date
  version: number
  enteredBy: string
  lab: string
  analyteCode: string
  analyteName: string
  description: string
  shortName: string
  bill: boolean
  price: number
  schedule: Date
  autoRelease: boolean
  holdOOS: boolean
  instantResult: boolean
  tubeGroups: string
  pageBreak: boolean
  method: boolean
  analyteMethod: string
  workflow: string
  sampleType: string
  display: boolean
  calculationFlag: boolean
  calcyName: string
  high: string
  low: string
  repetition: boolean
  picture: string
  units: string
  usage: string
  cptCode: string
  resultType: string
  analyteType: string
  status: string
  environment: string
  dateOfEntry: Date
  lastUpdated: Date  

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id || ''
    this.existsVersionId = rawData.existsVersionId || ''
    this.existsRecordId = rawData.existsRecordId || ''
    this.dateCreation = rawData.dateCreation || ''
    this.dateActiveFrom = rawData.dateActiveFrom || ''
    this.dateActiveTo = rawData.dateActiveTo || ''
    this.version = rawData.version || 0
    this.enteredBy = rawData.enteredBy || ''
    this.lab = rawData.lab || ''
    this.analyteCode = rawData.analyteCode || ''
    this.analyteName = rawData.analyteName || ''
    this.description = rawData.description || ''
    this.shortName = rawData.shortName || ''
    this.bill = rawData.bill || false
    this.price = rawData.price || 0
    this.schedule = rawData.schedule || ''
    this.autoRelease = rawData.autoRelease || false
    this.holdOOS = rawData.holdOOS || false
    this.instantResult = rawData.instantResult || false
    this.tubeGroups = rawData.tubeGroups || ''
    this.pageBreak = rawData.pageBreak || false
    this.method = rawData.method || false
    this.analyteMethod = rawData.analyteMethod || ''
     this.workflow = rawData.workflow || ''
    this.sampleType = rawData.sampleType || ''
    this.display = rawData.display || false
    this.calculationFlag = rawData.calculationFlag || false
    this.calcyName = rawData.calcyName || ''
    this.high = rawData.high|| ''
    this.low = rawData.low || ''
    this.repetition = rawData.repetition || false
    this.picture = rawData.picture || ''
    this.units = rawData.units || ''
    this.usage = rawData.usage || ''
    this.cptCode = rawData.cptCode || ''
    this.resultType = rawData.resultType || ''
    this.analyteType = rawData.analyteType || ''
    this.status = rawData.status || ''
    this.environment = rawData.environment || ''
    this.dateOfEntry = rawData.dateOfEntry || ''
    this.lastUpdated = rawData.lastUpdated || ''
  }
}
