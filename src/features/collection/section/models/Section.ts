export class Section {   
    departmentCode: string
    code: string
    name: string
    shortName: string
    sectionInCharge: string
    mobieNo: string
    contactNo: string
    fyiLine: string
    workLine: string
    status: string
    constructor(rawData: {[key in string]: any}){
        this.departmentCode = rawData.departmentCode
        this.code = rawData.code
        this.name = rawData.name
        this.shortName = rawData.shortName
        this.sectionInCharge = rawData.sectionInCharge
        this.mobieNo = rawData.mobieNo
        this.contactNo = rawData.contactNo
        this.fyiLine = rawData.fyiLine
        this.workLine = rawData.workLine
        this.status = rawData.status
    }
  }
  