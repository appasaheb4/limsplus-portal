export class Deginisation {
    code?: string;
    description?: string;
    environment?: string;
    constructor(rawData: {[key in string]: any}){
        this.code = rawData.code
        this.description = rawData.description
        this.environment = rawData.environment
    }
  }
    