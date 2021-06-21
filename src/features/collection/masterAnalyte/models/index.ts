export interface MasterAnalyte {
  _id?: string,
  dateCreation?: number  
  dateActive?: number  
  version?: number
  keyNum?: string
  enteredBy?: string
  lab?: string
  analyteCode?: string
  analyteName?: string
  description?: string
  shortName?: string
  bill?: boolean
  price?: number
  schedule?: number
  autoRelease?: boolean
  holdOOS?: boolean
  instantResult?: boolean
  tubeGroups?: string
  pageBreak?: boolean
  method?: boolean
  analyteMethod?: string
  workflow?: string
  sampleType?: string
  display?: boolean
  calculationFlag?: boolean
  calcyName?: string
  high?: string
  low?: string
  repetition?: boolean
  picture?: "0" | "1" | "2" | "3"
  units?: string
  usage?: string
  cptCode?: string
  status?: string
}
