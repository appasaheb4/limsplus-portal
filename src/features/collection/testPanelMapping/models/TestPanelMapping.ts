export class TestPanelMapping {
  _id: string
  existsVersionId: string
  existsRecordId: string
  dateCreation: Date
  dateActiveFrom: Date
  dateActiveTo: Date
  version: number
  enteredBy: string
  lab: string  
  panelCode: string
  testCode: Array<string>
  testName: Array<string>
  description: string
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
    this.dateActiveFrom = rawData.dateActiveFrom
    this.dateActiveTo = rawData.dateActiveTo
    this.version = rawData.version
    this.enteredBy = rawData.enteredBy
    this.lab = rawData.lab
    this.panelCode = rawData.panelCode
    this.testCode = rawData.testCode
    this.testName = rawData.testName
    this.description = rawData.description
    this.bill = rawData.bill
    this.status = rawData.status
    this.environment = rawData.environment
    this.dateOfEntry = rawData.dateOfEntry
    this.lastUpdated = rawData.lastUpdated
  }
}
