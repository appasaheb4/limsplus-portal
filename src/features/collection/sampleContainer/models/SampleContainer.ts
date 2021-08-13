export class SampleContainer {
    _id: string
    containerCode: string
    containerName: string
    description: string
    image: any
    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.containerCode = rawData.containerCode
        this.containerName = rawData.containerName
        this.description = rawData.description
        this.image = rawData.image
    }
  }
  