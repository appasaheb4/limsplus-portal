export class RegistrationLocations {
    _id?: string
    existsVersionId?: string
    existsRecordId?: string
    dateCreation?: number
    dateActiveFrom?: number
    dateActiveTo?: number
    version?: number
    keyNum?: string
    enteredBy?: string
    locationCode?: string
    locationName?: string
    address?: string
    city?: string
    state?: string
    country?: string
    postcode?: number
    customerGroup?: string
    category?: string
    confidential?: boolean
    telephone?: string
    mobileNo?: string
    email?: string
    deliveryType?: string
    deliveryMethod?: string
    corporateCode?: string
    invoiceAc?: string
    labLicence?: string
    printLabel?: boolean
    methodColn?: string
    workHrs?: number
    salesTerritoRy?: string
    area?: string
    zone?: string
    route?: string
    lab?: string
    location?: string
    neverBill?: boolean
    edi?: string
    ediAddress?: string
    urgent?: boolean
    schedule?: string
    reportFormat?: string
    info?: string
    fyiLine?: string
    workLine?: string
    status?: string
    constructor(rawData: {[key in string]: any}){
      this._id = rawData._id
      this.existsVersionId = rawData.existsVersionId
      this.existsRecordId = rawData.existsRecordId
      this.dateCreation = rawData.dateCreation
      this.dateActiveFrom = rawData.dateActiveFrom
      this.dateActiveTo = rawData.dateActiveTo
      this.version = rawData.version
      this.keyNum = rawData.keyNum
      this.enteredBy = rawData.enteredBy
      this.locationCode = rawData.locationCode
      this.locationName = rawData.locationName
      this.address = rawData.address
      this.city = rawData.city
      this.state = rawData.state
      this.country = rawData.country
      this.postcode = rawData.postcode
      this.customerGroup = rawData.customerGroup
      this.category = rawData.category
      this.confidential = rawData.confidential
      this.schedule = rawData.schedule
      this.telephone = rawData.telephone
      this.mobileNo = rawData.mobileNo
      this.email = rawData.email
      this.deliveryType = rawData.deliveryType
      this.deliveryMethod = rawData.deliveryMethod
      this.urgent = rawData.urgent
      this.corporateCode = rawData.corporateCode
      this.invoiceAc = rawData.invoiceAc
      this.labLicence = rawData.labLicence
      this.printLabel = rawData.printLabel
      this.methodColn = rawData.methodColn
      this.workHrs = rawData.workHrs
      this.salesTerritoRy = rawData.salesTerritoRy
      this.area = rawData.area
      this.zone = rawData.zone
      this.route = rawData.route
      this.lab = rawData.lab
      this.location = rawData.location
      this.neverBill = rawData.neverBill
      this.edi = rawData.edi
      this.printLabel = rawData.printLabel
      this.ediAddress = rawData.ediAddress
      this.schedule = rawData.schedule
      this.reportFormat = rawData.reportFormat
      this.info = rawData.info
      this.fyiLine = rawData.fyiLine
      this.workLine = rawData.workLine
      this.status = rawData.status
    }
  }
  