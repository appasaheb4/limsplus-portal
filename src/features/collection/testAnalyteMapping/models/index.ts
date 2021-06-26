export interface TestAnalyteMapping {
  _id?: string
  dateCreation?: number  
  dateActiveFrom?: number  
  dateActiveTo?: number  
  version?: number
  keyNum?: string
  enteredBy?: string
  lab?: string
  analyteCode?: string
  testCode?: string
  testName?: string
  description?: string
  bill?: boolean
  status?: string
}
