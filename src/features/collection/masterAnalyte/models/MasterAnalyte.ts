export class MasterAnalyte {
  _id: string
  existsVersionId: string
  existsRecordId: string
  dateCreation: Date
  dateActive: Date
  dateExpire: Date
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
    this._id = rawData._id 
    this.existsVersionId = rawData.existsVersionId 
    this.existsRecordId = rawData.existsRecordId 
    this.dateCreation = rawData.dateCreation 
    this.dateActive = rawData.dateActive 
    this.dateExpire = rawData.dateExpire 
    this.version = rawData.version 
    this.enteredBy = rawData.enteredBy 
    this.lab = rawData.lab 
    this.analyteCode = rawData.analyteCode 
    this.analyteName = rawData.analyteName 
    this.description = rawData.description 
    this.shortName = rawData.shortName 
    this.bill = rawData.bill 
    this.price = rawData.price 
    this.schedule = rawData.schedule 
    this.autoRelease = rawData.autoRelease 
    this.holdOOS = rawData.holdOOS 
    this.instantResult = rawData.instantResult 
    this.tubeGroups = rawData.tubeGroups 
    this.pageBreak = rawData.pageBreak 
    this.method = rawData.method 
    this.analyteMethod = rawData.analyteMethod 
     this.workflow = rawData.workflow 
    this.sampleType = rawData.sampleType 
    this.display = rawData.display 
    this.calculationFlag = rawData.calculationFlag 
    this.calcyName = rawData.calcyName 
    this.high = rawData.high
    this.low = rawData.low 
    this.repetition = rawData.repetition 
    this.picture = rawData.picture 
    this.units = rawData.units 
    this.usage = rawData.usage 
    this.cptCode = rawData.cptCode 
    this.resultType = rawData.resultType 
    this.analyteType = rawData.analyteType 
    this.status = rawData.status 
    this.environment = rawData.environment 
    this.dateOfEntry = rawData.dateOfEntry 
    this.lastUpdated = rawData.lastUpdated 
  }
}

export class SelectedItems {
  lab: any[]
  constructor(rawData: {[key in string]: any}){
    this.lab = rawData.lab
  }
}
