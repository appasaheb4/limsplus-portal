export interface MasterPanel {
  rLab?: string
  pLab?: string
  department?: string
  section?: string
  panelCode?: string
  panelName?: string
  description?: string
  shortName?: string
  bill?: boolean
  price?: number
  schedule?: string
  tat?: string
  autoRelase?: boolean
  holdOOS?: boolean
  validationLevel?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  confidential?: boolean
  urgent?: boolean
  instantResult?: boolean
  reportGroup?: string
  reportOrder?: string
  sex?: string
  sexAction?: boolean
  hiAge?: string
  loAge?: string
  processing?: "manual" | "aemi" | "automatic"
  repitation?: boolean
  tubeGroup?: string
  printLabel?: boolean
  labelInstruction?: string
  pageBreak?: string
  method?: boolean
  panelMethod?: string
  workflow?: string
  cumulative?: boolean
  reportTemplate?: string
  sampleType?: string
  specalInstructions?: string
  status?: string
}
