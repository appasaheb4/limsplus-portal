export class Labs {
    _id: string
    code: string
    name: string
    country: string
    state: string
    district: string
    city: string
    area: string
    postalCode: string
    address: string
    deliveryType: string
    salesTerritory: string
    labLicence: string
    director: string
    physician: string
    mobileNo: string
    contactNo: string
    speciality: string
    labType: string
    openingTime: string
    closingTime: string
    email: string
    labLog: any   
    image: string
    autoRelease: boolean
    requireReceveInLab: boolean
    requireScainIn: boolean
    routingDept: boolean
    fyiLine: string
    workLine: string
    status: string
    environment: string

    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.code = rawData.code
        this.name = rawData.name
        this.country = rawData.country
        this.state = rawData.state
        this.district = rawData.district
        this.city = rawData.city
        this.area = rawData.area
        this.postalCode = rawData.postalCode
        this.address = rawData.address
        this.deliveryType = rawData.deliveryType
        this.salesTerritory = rawData.salesTerritory
        this.labLicence = rawData.labLicence
        this.director = rawData.director
        this.physician = rawData.physician
        this.mobileNo = rawData.mobileNo
        this.contactNo = rawData.contactNo
        this.speciality = rawData.speciality
        this.labType = rawData.labType
        this.openingTime = rawData.openingTime
        this.closingTime = rawData.closingTime
        this.email = rawData.email
        this.labLog = rawData
        this.image = rawData.image
        this.autoRelease= rawData.autoRelease
        this.requireReceveInLab = rawData.requireReceveInLab
        this.requireScainIn = rawData.requireScainIn
        this.routingDept = rawData.routingDept
        this.fyiLine = rawData.fyiLine
        this.workLine = rawData.workLine
        this.status = rawData.status
        this.environment = rawData.environment
    }
  }
  