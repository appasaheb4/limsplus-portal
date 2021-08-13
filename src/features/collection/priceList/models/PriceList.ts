export class PriceList {
  _id: string
  panelCode: string
  panelName: string
  priority: string
  priceGroup: string
  billTo: string
  clientName: string
  invoiceAc: string
  lab: string
  price: number
  fixedPrice: number
  minSp: number  
  maxSp: number
  anyScheme: boolean
  speicalScheme: string
  schemePrice: number
  disOnScheme: string
  enteredBy: string
  status: string
  environment: string
  dateCreation: number
  dateActive: number
  dateExpiry: number
  version: number
  keyNum: number
  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
    this.panelCode = rawData.panelCode
    this.panelName = rawData.panelName
    this.priority = rawData.priority
    this.priceGroup = rawData.priceGroup
    this.billTo = rawData.billTo
    this.clientName = rawData.clientName
    this.invoiceAc = rawData.invoiceAc
    this.lab = rawData.lab
    this.price = rawData.price
    this.fixedPrice = rawData.fixedPrice
    this.minSp = rawData.minSp
    this.maxSp = rawData.maxSp
    this.anyScheme = rawData.anyScheme
    this.speicalScheme = rawData.speicalScheme
    this.schemePrice = rawData.schemePrice
    this.disOnScheme = rawData.disOnScheme
    this.enteredBy = rawData.enteredBy
    this.status = rawData.status
    this.environment = rawData.environment
    this.dateCreation = rawData.dateCreation
    this.dateActive = rawData.dateActive
    this.dateExpiry = rawData.dateExpiry
    this.version = rawData.version
    this.keyNum = rawData.keyNum
  }
}
