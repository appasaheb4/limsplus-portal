export class Department {
    _id?: string
    lab?: string
    code?: string
    name?: string
    shortName?: string
    hod?: string
    mobileNo?: string
    contactNo?: string
    autoRelease?: boolean
    requireReceveInLab?: boolean
    requireScainIn?: boolean
    routingDept?: boolean
    openingTime?: string
    closingTime?: string
    fyiLine?: string
    workLine?: string
    status?: string
    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.lab = rawData.lab
        this.code = rawData.code
        this.name = rawData.name
        this.shortName = rawData.shortName
        this.hod = rawData.hod
        this.mobileNo = rawData.mobileNo
        this.autoRelease = rawData.autoRelease
        this.requireReceveInLab = rawData.requireReceveInLab
        this.requireScainIn = rawData.requireScainIn
        this.routingDept = rawData.routingDept
        this.openingTime = rawData.openingTime
        this.closingTime = rawData.closingTime
        this.fyiLine = rawData.fyiLine
        this.workLine = rawData.workLine
        this.status = rawData.status
    }
  }
  