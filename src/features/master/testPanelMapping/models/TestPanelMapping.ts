export class TestPanelMapping {
  _id: string
  existsVersionId: string
  existsRecordId: string
  dateCreation: Date
  dateActive: Date
  dateExpire: Date
  version: number
  enteredBy: string
  lab: string  
  panelCode: string
  testCode: Array<string>
  testName: Array<string>
  bill: boolean
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
    this.panelCode = rawData.panelCode
    this.testCode = rawData.testCode
    this.testName = rawData.testName
    this.bill = rawData.bill
    this.status = rawData.status
    this.environment = rawData.environment
    this.dateOfEntry = rawData.dateOfEntry
    this.lastUpdated = rawData.lastUpdated
  }
}
