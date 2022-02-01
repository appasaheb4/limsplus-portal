class CommonInput {
  id: number
  analyteCode: string
  analyteName: string
  department: string
  species: string
  rangeSetOn: string
  equipmentType: string
  lab: string
  rangeType?: string
  sex?: string
  ageFrom?: number
  ageTo?: number
  ageUnit?: string
  low?: number
  high?: number
  alpha?: string
  deltaType?: string
  deltaInterval?: string
  intervalUnit?: string
  colorLo?: string
  colorHi?: string
  colorNormal?: string
  version: number
  dateCreation: Date
  dateActive: Date
  dateExpire: Date
  enterBy: string
  status: string
  environment: string

  constructor(rawData: { [key in string]: any }) {
    this.id = rawData.id
    this.analyteCode = rawData.analyteCode
    this.analyteName = rawData.analyteName
    this.department = rawData.department
    this.species = rawData.species
    this.rangeSetOn = rawData.rangeSetOn
    this.equipmentType = rawData.equipmentType
    this.lab = rawData.lab
    this.rangeType = rawData.rangeType
    this.sex = rawData.sex
    this.ageFrom = rawData.ageFrom
    this.ageTo = rawData.ageTo
    this.ageUnit = rawData.ageUnit
    this.low = rawData.low
    this.high = rawData.high
    this.alpha = rawData.alpha
    this.deltaType = rawData.deltaType
    this.deltaInterval = rawData.deltaInterval
    this.intervalUnit = rawData.intervalUnit
    this.colorLo = rawData.colorLo
    this.colorHi = rawData.colorHi
    this.colorNormal = rawData.colorNormal
    this.version = rawData.version
    this.dateCreation = rawData.rawData.dateCreation
    this.dateActive = rawData.dateActive
    this.dateExpire = rawData.dateExpire
    this.enterBy = rawData.enterBy
    this.status = rawData.status
    this.environment = rawData.environment
  }
}
    
export class ReferenceRanges extends CommonInput {
  _id: string
  existsVersionId: string
  existsRecordId: string
  dateOfEntry: Date
  lastUpdated: Date
  refRangesInputList: CommonInput[]
  refreshList: boolean
  constructor(rawData: { [key in string]: any }) {
    super(rawData)
    this._id = rawData._id
    this.existsVersionId = rawData.existsVersionId
    this.existsRecordId = rawData.existsRecordId
    this.dateOfEntry = rawData.dateOfEntry
    this.lastUpdated = rawData.lastUpdated
    this.refRangesInputList = rawData.refRangesInputList
    this.refreshList = rawData.refreshList
  }
}
