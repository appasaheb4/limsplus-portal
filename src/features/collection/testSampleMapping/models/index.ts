export interface TestSampleMapping {
  _id?: string
  testCode?: string   
  sampleCode?: string
  sampleType?: string
  sampleGroup?: string
  collContainerCode?: string
  collContainerName?: string
  testContainerCode?: string
  testContainerName?: string
  primaryContainer?: boolean
  uniqueContainer?: boolean
  centerIfuge?: boolean
  aliquot?: boolean
  labSpecfic?: boolean
  departmentSpecfic?: boolean
  sharedSample?: boolean
  minDrawVol?: string
  minDrawVolUnit?: string
  minTestVol?: string
  minTestVolUnit?: string
  condition?: string
  repentionPeriod?: string
  repentionUnits?: string
  labelInst?: string
  printLabels?: boolean
  info?: string
}
