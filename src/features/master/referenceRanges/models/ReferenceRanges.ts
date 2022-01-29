export class ReferenceRanges {
  _id: string
  analyteCode: string
  analyteName: string
  department: string
  species: string
  rangeSetOn: string
  equipmentType: string
  lab: string
  refRangesInputList: any[]
  existsVersionId: string
  existsRecordId: string
  dateOfEntry: Date
  lastUpdated: Date
  
  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
    this.analyteCode = rawData.analyteCode
    this.analyteName = rawData.analyteName
    this.department = rawData.department
    this.species = rawData.species
    this.rangeSetOn = rawData.rangeSetOn
    this.equipmentType = rawData.equipmentType
    this.lab = rawData.lab
    this.refRangesInputList = rawData.refRangesInputList
    this.existsVersionId = rawData.existsVersionId
    this.existsRecordId = rawData.existsRecordId
    this.dateOfEntry = rawData.dateOfEntry
    this.lastUpdated = rawData.lastUpdated
  }
}
