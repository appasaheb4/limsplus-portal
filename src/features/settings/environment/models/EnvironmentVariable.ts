export class EnvironmentVariable {
  _id: string
  environmentVariable: string
  category: string
  descriptions: string
  enteredBy: string
  documentType: string
  dateOfEntry: Date
  lastUpdated: Date
  
  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
    this.environmentVariable = rawData.environmentVariable
    this.category = rawData.category
    this.descriptions = rawData.descriptions
    this.enteredBy = rawData.enteredBy
    this.documentType = rawData.documentType
    this.dateOfEntry = rawData.dateOfEntry
    this.lastUpdated = rawData.lastUpdated
  }
}
