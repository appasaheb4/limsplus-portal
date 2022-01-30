class CommonInput {
  _id: string
  analyteCode: string
  analyteName: string
  department: string
  species: string
  rangeSetOn: string
  equipmentType: string
  lab: string
  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
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
  existsVersionId: string
  existsRecordId: string
  dateOfEntry: Date
  lastUpdated: Date
  refRangesInputList: CommonInput[]
  constructor(rawData: { [key in string]: any }) {
    super(rawData)
    this.existsVersionId = rawData.existsVersionId
    this.existsRecordId = rawData.existsRecordId
    this.dateOfEntry = rawData.dateOfEntry
    this.lastUpdated = rawData.lastUpdated
    this.refRangesInputList = rawData.refRangesInputList
  }
}
