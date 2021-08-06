export interface TestAnalyteMapping {
  _id?: string
  existsVersionId?: string
  existsRecordId?: string
  dateCreation?: number
  dateActiveFrom?: number
  dateActiveTo?: number
  version?: number
  keyNum?: string
  enteredBy?: string  
  lab?: string
  analyteCode?: Array<any>
  analyteName?: Array<any>
  testCode?: string
  testName?: string
  description?: string
  bill?: boolean
  status?: string
  environment?: string
}
