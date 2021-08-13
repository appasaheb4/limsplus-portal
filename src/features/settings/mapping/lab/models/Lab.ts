export class ILabMapping {
    _id: string
    user: {}
    labs: string[]
    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.user = rawData.user
        this.labs = rawData.labs
    }
  }
  