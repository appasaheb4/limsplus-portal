export class SampleType {
    _id?: string
    sampleCode?: string;
    sampleType?: string;
    descriptions?: string;
    sampleGroup?: string;
    environment?: string
    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.sampleCode = rawData.sampleCode
        this.sampleType = rawData.sampleType
        this.descriptions = rawData.descriptions
        this.sampleGroup = rawData.sampleGroup
        this.environment = rawData.environment
    }
  }
  