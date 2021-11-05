export class SampleContainer {
    _id: string
    containerCode: string
    containerName: string
    description: string
    image: any
    environment: string
    dateOfEntry: Date
    lastUpdated: Date  
    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.containerCode = rawData.containerCode
        this.containerName = rawData.containerName
        this.description = rawData.description
        this.image = rawData.image
        this.environment = rawData.environment
        this.dateOfEntry = rawData.dateOfEntry
        this.lastUpdated = rawData.lastUpdated
    }
  }
  