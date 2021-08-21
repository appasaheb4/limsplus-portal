export class Methods {
    _id?: string
    methodsCode?: string
    methodsName?: string
    description?: string
    status?: string
    environment?: string
    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.methodsCode = rawData.methodsCode
        this.methodsName = rawData.methodsName
        this.description = rawData.description
        this.status = rawData.status
        this.environment = rawData.environment
    }
  }
  