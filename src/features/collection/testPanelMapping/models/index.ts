export interface TestPanelMapping {
  id?: string  
  existsVersionId?: string
  existsRecordId?: string
  dateCreation?: number
  dateActiveFrom?: number
  dateActiveTo?: number
  version?: number
  keyNum?: string
  enteredBy?: string
  lab?: string  
  panelCode?: string
  testCode?: Array<string>
  testName?: Array<string>
  description?: string
  bill?: boolean
  status?: string
  environment?: string
}
