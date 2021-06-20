export interface TestAnalyteMapping {
  dateCreation?: number  
  dateActive?: number  
  version?: number
  keyNum?: string
  enteredBy?: string
  lab?: string
  analyteCode?: Array<any>
  testCode?: string
  testName?: string
  description?: string
  bill?: boolean
  status?: string
}
