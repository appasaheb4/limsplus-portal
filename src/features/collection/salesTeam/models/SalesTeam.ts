export class SalesTeam {
    _id?: string  
    salesHierarchy?: string
    salesTerritory?: any
    empCode?: string
    empName?: string
    reportingTo?: string
    environment?: string
    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.salesHierarchy = rawData.salesHierarchy
        this.salesTerritory = rawData.salesTerritory
        this.empCode = rawData.empCode
        this.empName = rawData.empName
        this.reportingTo = rawData.reportingTo
        this.environment = rawData.environment
    }
  }

  