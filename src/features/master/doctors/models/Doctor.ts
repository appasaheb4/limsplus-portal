export class Doctors {
    _id: string
    existsVersionId: string
    existsRecordId: string
    doctorCode: string
    doctorName: string
    sex: string
    title: string
    reportName: string
    doctorType: string
    speciality: string
    category: string
    address: string
    country: string
    state: string
    district: string
    city: string
    area: string
    postalCode: number
    zone: string
    salesTerritoRy: string
    telephone: string
    mobileNo: string
    email: string
    deliveryType: string
    deliveryMethod: string
    registrationLocation: string
    lab: string
    openingTime: string
    closingTime: string
    schedule: string
    info: string
    fyiLine: string
    workLine: string
    confidential: boolean
    urgent: boolean
    reportFormat: boolean
    dateCreation: Date  
    dateActive: Date  
    dateExpire: Date 
    version: number
    enteredBy: string
    status: string
    environment: string
    dateOfEntry: Date
    lastUpdated: Date  

    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.existsVersionId = rawData.existsVersionId
        this.existsRecordId = rawData.existsRecordId
        this.doctorCode = rawData.doctorCode
        this.doctorName = rawData.doctorName
        this.sex = rawData.sex
        this.title = rawData.title
        this.reportName = rawData.reportName
        this.doctorType = rawData.doctorType
        this.speciality = rawData.speciality
        this.category = rawData.category
        this.address = rawData.address    
        this.country = rawData.country
        this.state = rawData.state
        this.district = rawData.district
        this.city = rawData.city
        this.area = rawData.area
        this.postalCode = rawData.postalCode
        this.zone = rawData.zone
        this.salesTerritoRy = rawData.salesTerritoRy
        this.telephone = rawData.telephone
        this.mobileNo = rawData.mobileNo
        this.email = rawData.email
        this.deliveryType = rawData.deliveryType
        this.deliveryMethod = rawData.deliveryMethod
        this.registrationLocation = rawData.registrationLocation
        this.lab = rawData.lab
        this.openingTime = rawData.openingTime 
        this.closingTime = rawData.closingTime         
        this.schedule = rawData.schedule
        this.info = rawData.info
        this.fyiLine = rawData.fyiLine
        this.workLine = rawData.workLine
        this.confidential = rawData.confidential
        this.urgent = rawData.urgent
        this.reportFormat = rawData.reportFormat
        this.dateCreation = rawData.dateCreation
        this.dateActive = rawData.dateActive
        this.dateExpire = rawData.dateExpire
        this.version = rawData.version
        this.enteredBy = rawData.enteredBy
        this.status = rawData.status
        this.environment = rawData.environment
        this.dateOfEntry = rawData.dateOfEntry
        this.lastUpdated = rawData.lastUpdated
    }
  }
  