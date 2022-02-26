export class TestAnalyteMapping {
  _id: string
  existsVersionId: string
  existsRecordId: string
  dateCreation: Date
  dateActive: Date
  dateExpire: Date
  version: number
  enteredBy: string
  lab: string
  analyteCode: Array<any>
  analyteName: Array<any>
  testCode: string
  testName: string
  bill: boolean
  testMethod: boolean
  analyteMethod: boolean
  status: string
  resultOrder: Array<string>
  reportOrder: Array<string>
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
    this.testCode = rawData.testCode
    this.testName = rawData.testName
    this.bill = rawData.bill
    this.testMethod = rawData.testMethod
    this.analyteMethod = rawData.analyteMethod
    this.status = rawData.status
    this.resultOrder = rawData.resultOrder
    this.reportOrder = rawData.reportOrder
    this.environment = rawData.environment
    this.dateOfEntry = rawData.dateOfEntry
    this.lastUpdated = rawData.lastUpdated
  }
}
export class SelectedItems {
  lab: any[]
  analyteCode: any[]
  constructor(rawData: { [key in string]: any }) {
    this.lab = rawData.lab
    this.analyteCode = rawData.analyteCode
  }
}
