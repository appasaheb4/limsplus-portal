export class Library {
  code: string    
  description: string
  usageType: string
  libraryType: string
  commentType: string
  lab: string
  department: string   
  commentsTarget: string
  details: string
  parameter: string
  action: string
  results: string
  value: string
  reflex: Array<any>
  analyte: string
  rule: string
  abNormal: boolean
  status: string
  organismGroup: string
  organismClass: string
  loAge: number
  hiAge: number
  sex: string
  sexAction: string

  constructor(rawData: { [key in string]: any }) {
    this.code = rawData.code
    this.description = rawData.description
    this.usageType = rawData.usageType
    this.libraryType = rawData.libraryType
    this.commentType = rawData.commentType
    this.lab = rawData.lab
    this.department = rawData.department
    this.commentsTarget = rawData.commentsTarget
    this.details = rawData.details
    this.parameter = rawData.parameter
    this.action = rawData.action
    this.results = rawData.results
    this.value = rawData.value
    this.reflex = rawData.reflex
    this.analyte = rawData.analyte
    this.rule = rawData.rule
    this.abNormal = rawData.abNormal
    this.status = rawData.status
    this.organismGroup = rawData.organismGroup
    this.organismClass = rawData.organismClass
    this.loAge = rawData.loAge
    this.hiAge = rawData.hiAge
    this.sex = rawData.sex
    this.sexAction = rawData.sexAction
  }
}
