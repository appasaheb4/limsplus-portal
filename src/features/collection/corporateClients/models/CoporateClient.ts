export class CorporateClients {
    _id: string
    duplicateId: string
    dateCreation: number
    dateActiveFrom: number
    dateActiveTo: number
    version: number
    keyNum: string
    enteredBy: string
    corporateCode: string
    corporateName: string
    invoiceAc: string
    priceList: string
    priceGroup: string
    billingOn: string
    address: string
    city: string
    state: string
    country: string
    postcode: number
    customerGroup: string
    category: string
    confidential: boolean
    telephone: string
    mobileNo: string
    email: string   
    deliveryType: string
    deliveryMethod: string
    salesTerritoRy: string
    area: string
    zone: string
    edi: string
    ediAddress: string
    urgent: boolean
    schedule: string
    reportFormat: string
    info: string
    fyiLine: string
    workLine: string
    status: string
    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.duplicateId = rawData.duplicateId
        this.dateCreation = rawData.dateCreation
        this.dateActiveFrom = rawData.dateActiveFrom
        this.dateActiveTo = rawData.dateActiveTo
        this.version = rawData.version
        this.keyNum = rawData.keyNum
        this.enteredBy = rawData.enteredBy
        this.corporateCode = rawData.corporateCode
        this.corporateName = rawData.corporateName
        this.invoiceAc = rawData.invoiceAc
        this.priceList = rawData.priceList
        this.priceGroup = rawData.priceGroup
        this.billingOn = rawData.billingOn
        this.address = rawData.address
        this.city = rawData.city
        this.state = rawData.state
        this.country = rawData.country
        this.postcode = rawData.postcode
        this.customerGroup = rawData.customerGroup
        this.category = rawData.category
        this.confidential = rawData.confidential
        this.telephone = rawData.telephone
        this.mobileNo = rawData.mobileNo
        this.email = rawData.email
        this.deliveryType = rawData.deliveryType
        this.deliveryMethod = rawData.deliveryMethod
        this.salesTerritoRy = rawData.salesTerritoRy
        this.area = rawData.area
        this.zone = rawData.zone
        this.edi = rawData.edi
        this.ediAddress = rawData.ediAddress
        this.urgent = rawData.urgent
        this.schedule = rawData.schedule
        this.reportFormat = rawData.reportFormat
        this.info = rawData.info
        this.fyiLine = rawData.fyiLine
        this.workLine = rawData.workLine
        this.status = rawData.status
        
    }
  }
  