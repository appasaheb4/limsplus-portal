export class TestAnalyteMapping {
  _id: string
  existsVersionId: string
  existsRecordId: string
  dateCreation: Date
  dateActiveFrom: Date
  dateActiveTo: Date
  version: number
  enteredBy: string
  lab: string
  analyteCode: Array<any>
  analyteName: Array<any>
  testCode: string
  testName: string
  description: string
  bill: boolean
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
    this.dateActiveTo = rawData.dateActiveTo|| ''
    this.version = rawData.version || 0
    this.enteredBy = rawData.enteredBy || ''
    this.lab = rawData.lab || ''
    this.analyteCode = rawData.analyteCode || []
    this.analyteName = rawData.analyteName || []
    this.testCode = rawData.testCode || ''
    this.testName = rawData.testName || ''
    this.description = rawData.description || ''
    this.bill = rawData.bill || false
    this.status = rawData.status || false
    this.environment = rawData.environment || ''
    this.dateOfEntry = rawData.dateOfEntry || ''
    this.lastUpdated = rawData.lastUpdated || ''
  }
}
