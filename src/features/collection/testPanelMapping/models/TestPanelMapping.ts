export class TestPanelMapping {
    id: string  
    existsVersionId: string
    existsRecordId: string
    dateCreation: number
    dateActiveFrom: number
    dateActiveTo: number
    version: number
    keyNum: string
    enteredBy: string
    lab: string  
    panelCode: string
    testCode: Array<string>
    testName: Array<string>
    description: string
    bill: boolean
    status: string
    environment: string
    constructor(rawData: {[key in string]: any}){
        this.id = rawData.id
        this.existsVersionId = rawData.existsVersionId
        this.existsRecordId = rawData.existsRecordId
        this.dateCreation = rawData.dateCreation
        this.dateActiveFrom = rawData.dateActiveFrom
        this.dateActiveTo = rawData.dateActiveTo
        this.version = rawData.version
        this.keyNum = rawData.keyNum
        this.enteredBy = rawData.enteredBy
        this.lab = rawData.lab
        this.panelCode = rawData.panelCode
        this.testCode = rawData.testCode
        this.testName = rawData.testName
        this.description = rawData.description
        this.bill = rawData.bill
        this.status = rawData.status
        this.environment = rawData.environment
    }
  }
  