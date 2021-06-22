export interface TestPanelMapping {
  id?: string
  dateCreation?: number  
  dateActive?: number  
  version?: number
  keyNum?: string
  enteredBy?: string
  lab?: string
  panelCode?: Array<any>
  testCode?: string
  testName?: string
  description?: string
  bill?: boolean
  status?: string
}
