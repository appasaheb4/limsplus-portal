class CommonInput {
  id: number
  analyteCode: string
  analyteName: string
  department: string
  species: string
  rangeSetOn: string
  equipmentType: string
  lab: string
  constructor(rawData: { [key in string]: any }) {
    this.id = rawData.id
    this.analyteCode = rawData.analyteCode
    this.analyteName = rawData.analyteName
    this.department = rawData.department
    this.species = rawData.species
    this.rangeSetOn = rawData.rangeSetOn
    this.equipmentType = rawData.equipmentType
    this.lab = rawData.lab
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
