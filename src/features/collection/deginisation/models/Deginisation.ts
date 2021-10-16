export class Deginisation {
    _id: string
    code: string;
    description: string;
    environment: string;
    constructor(rawData: {[key in string]: any}){
        this._id = rawData.id
        this.code = rawData.code
        this.description = rawData.description
        this.environment = rawData.environment
    }
  }
    