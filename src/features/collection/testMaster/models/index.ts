export interface TestMaster {
  dateCreation?: string  
  dateActive?: string  
  version?: number
  keyNum?: string
  enteredBy?: string
  rLab?: string
  pLab?: string
  department?: string
  section?: string
  testCode?: string
  testName?: string
  description?: string
  shortName?: string
  bill?: boolean
  price?: number
  schedule?: string
  tat?: string
  autoFinish?: boolean
  holdOOS?: boolean
  validationLevel?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  confidential?: boolean
  urgent?: boolean
  instantResult?: boolean
  reportGroup?: string
  resultOrder?: string
  accredited?: boolean
  cretical?: boolean
  processing?: "MANUAL" | "AEMI" | "AUTOMATIC"
  repitation?: boolean
  tubeGroup?: string
  printLabel?: boolean
  labelInstruction?: string
  method?: boolean
  panelMethod?: string
  sampleRunOn?: "LABID" | "SAMPLEID"
  workflow?: string
  cumulative?: boolean
  sampleType?: string
  speicalInstructions?: string
  disease?: string
  category?: string
  testType?: string
  workflowCode?: string
  worklistCode?: string
  cptCode?: string
  qcHold?: boolean
  oosHold?: boolean
  deltaHold?: boolean
  prefix?: string
  sufix?: string
  deleverySchedule?: string
  allowPartial?: boolean
  collectionContainer?: string
  holdingDays?: string
  status?: string
}
