export class DataConversation {
    _id: string
    hexadecimal: string
    binary: string
    ascii: string
    environment: string
    dateOfEntry: Date
    lastUpdated: Date  

    constructor(rawData: { [key in string]: any }) {
      this._id = rawData._id
      this.hexadecimal = rawData.hexadecimal
      this.binary = rawData.binary
      this.ascii = rawData.ascii
      this.environment = rawData.environment
      this.dateOfEntry = rawData.dateOfEntry
      this.lastUpdated = rawData.lastUpdated
    }
  }
  