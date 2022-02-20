export class RegistrationLocations {
  _id: string
  existsVersionId: string
  existsRecordId: string
  locationCode: string
  locationName: string
  corporateCode: string
  invoiceAc: string
  priceList: any
  acClass: string
  accountType: string
  customerGroup: string
  methodColn: string
  category: string
  country: string
  state: string
  district: string
  city: string
  address: string
  postalCode: number
  salesTerritoRy: string
  area: string
  zone: string  
  telephone: string
  mobileNo: string
  email: string
  deliveryType: string
  deliveryMethod: string
  route: string
  lab: string
  openingTime: string
  closingTime: string
  schedule: string
  info: string
  fyiLine: string
  workLine: string
  confidential: boolean
  urgent: boolean
  printLabel: boolean
  neverBill: boolean
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
  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
    this.existsVersionId = rawData.existsVersionId
    this.existsRecordId = rawData.existsRecordId
    this.dateCreation = rawData.dateCreation
    this.dateActive = rawData.dateActive
    this.dateExpire = rawData.dateExpire
    this.version = rawData.version
    this.enteredBy = rawData.enteredBy
    this.locationCode = rawData.locationCode
    this.locationName = rawData.locationName
    this.address = rawData.address
    this.city = rawData.city
    this.state = rawData.state
    this.district = rawData.district
    this.country = rawData.country
    this.postalCode = rawData.postalCode
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
    this.priceList = rawData.priceList
    this.printLabel = rawData.printLabel
    this.methodColn = rawData.methodColn
    this.salesTerritoRy = rawData.salesTerritoRy
    this.area = rawData.area
    this.zone = rawData.zone
    this.route = rawData.route
    this.lab = rawData.lab
    this.openingTime = rawData.openingTime
    this.closingTime = rawData.closingTime
    this.neverBill = rawData.neverBill
    this.printLabel = rawData.printLabel
    this.schedule = rawData.schedule
    this.reportFormat = rawData.reportFormat
    this.info = rawData.info
    this.fyiLine = rawData.fyiLine
    this.workLine = rawData.workLine
    this.acClass = rawData.acClass
    this.accountType = rawData.accountType
    this.status = rawData.status
    this.environment = rawData.environment
    this.dateOfEntry = rawData.dateOfEntry
    this.lastUpdated = rawData.lastUpdated
  }
}
