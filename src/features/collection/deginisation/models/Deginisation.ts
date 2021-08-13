export class IDeginisation {
    code: string;
    description: string;
    constructor(rawData: {[key in string]: any}){
        this.code = rawData.code
        this.description = rawData.description
    }
  }
    