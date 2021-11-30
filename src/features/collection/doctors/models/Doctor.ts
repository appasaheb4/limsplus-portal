export class Doctors {
    _id: string
    existsVersionId: string
    existsRecordId: string
    dateCreation: Date  
    dateActive: Date  
    dateExpire: Date 
    version: number
    enteredBy: string
    doctorCode: string
    doctorName: string
    sex: string
    title: string
    firstName: string
    middleName: string
    lastName: string
    reportName: string
    address: string
    city: string
    state: string
    country: string
    postcode: number
    doctorType: string
    speciality: string
    confidential: boolean
    salesTerritoRy: string
    area: string
    zone: string
    telephone: string
    mobileNo: string
    email: string
    workHours: number
    deliveryType: string
    deliveryMethod: string
    edi: string
    ediAddress: string
    urgent: boolean
    registrationLocation: string
    lab: string
    location: string
    schedule: string
    reportFormat: string
    info: string
    fyiLine: string
    workLine: string
    status: string
    environment: string
    dateOfEntry: Date
    lastUpdated: Date

    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.existsVersionId = rawData.existsVersionId
        this.existsRecordId = rawData.existsRecordId
        this.dateCreation = rawData.dateCreation
        this.dateActive = rawData.dateActive
        this.dateExpire = rawData.dateExpire
        this.version = rawData.version
        this.enteredBy = rawData.enteredBy
        this.doctorCode = rawData.doctorCode
        this.doctorName = rawData.doctorName
        this.sex = rawData.sex
        this.title = rawData.title
        this.firstName = rawData.firstName
        this.middleName = rawData.middleName
        this.lastName = rawData.lastName
        this.reportName = rawData.reportName
        this.address = rawData.address
        this.city = rawData.city
        this.state = rawData.state
        this.country = rawData.country
        this.postcode = rawData.postcode
        this.doctorType = rawData.doctorType
        this.speciality = rawData.speciality
        this.confidential = rawData.confidential
        this.salesTerritoRy = rawData.salesTerritoRy
        this.area = rawData.area
        this.zone = rawData.zone
        this.telephone = rawData.telephone
        this.mobileNo = rawData.mobileNo
        this.email = rawData.email
        this.workHours = rawData.workHours
        this.deliveryType = rawData.deliveryType
        this.deliveryMethod = rawData.deliveryMethod
        this.edi = rawData.edi
        this.ediAddress = rawData.ediAddress
        this.urgent = rawData.urgent
        this.registrationLocation = rawData.registrationLocation
        this.lab = rawData.lab
        this.location = rawData.location
        this.schedule = rawData.schedule
        this.reportFormat = rawData.reportFormat
        this.info = rawData.info
        this.fyiLine = rawData.fyiLine
        this.workLine = rawData.workLine
        this.status = rawData.status
        this.environment = rawData.environment
        this.dateOfEntry = rawData.dateOfEntry
        this.lastUpdated = rawData.lastUpdated
    }
  }
  