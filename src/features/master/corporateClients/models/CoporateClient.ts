export class CorporateClients {
  _id: string
  existsVersionId: string
  existsRecordId: string
  corporateCode: string
  corporateName: string
  invoiceAc: string
  priceList: Array<{
    id: number
    priceGroup?: string
    priceList?: string
    description?: string
    priority?: number
    maxDis?: number
  }>
  clientSpecificPrice: boolean
  acType: string
  acClass: string
  billingOn: string
  billingFrequency: string
  customerGroup: string
  category: string
  country: string
  state: string
  district: string
  city: string
  area: string
  postalCode: number
  salesTerritoRy: string
  sbu: string
  zone: string
  telephone: string
  mobileNo: string
  email: string
  deliveryType: string
  deliveryMethod: string
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

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
    this.existsVersionId = rawData.existsVersionId
    this.existsRecordId = rawData.existsRecordId
    this.corporateCode = rawData.corporateCode
    this.corporateName = rawData.corporateName
    this.invoiceAc = rawData.invoiceAc
    this.priceList = rawData.priceList
    this.clientSpecificPrice = rawData.clientSpecificPrice
    this.acType = rawData.acType
    this.acClass = rawData.acClass
    this.billingOn = rawData.billingOn
    this.billingFrequency = rawData.billingFrequency
    this.customerGroup = rawData.customerGroup
    this.category = rawData.category
    this.country = rawData.country
    this.state = rawData.state
    this.district = rawData.district
    this.city = rawData.city
    this.area = rawData.area
    this.postalCode = rawData.postalCode
    this.salesTerritoRy = rawData.salesTerritoRy
    this.sbu = rawData.sbu
    this.zone = rawData.zone
    this.telephone = rawData.telephone
    this.mobileNo = rawData.mobileNo
    this.email = rawData.email
    this.deliveryType = rawData.deliveryType
    this.deliveryMethod = rawData.deliveryMethod
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
