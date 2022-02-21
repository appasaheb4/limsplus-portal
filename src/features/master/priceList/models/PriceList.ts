export class PriceList {
  _id: string
  existsVersionId: string
  existsRecordId: string
  priceGroup: string
  priceList: string
  description: string
  panelCode: string
  panelName: string
  price: number
  minSp: number
  maxSp: number
  maxDis: number
  fixedPrice: boolean
  enteredBy: string
  status: string
  environment: string
  dateCreation: Date
  dateActive: Date
  dateExpire: Date
  version: number
  dateOfEntry: Date
  lastUpdated: Date

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
    this.existsVersionId = rawData.existsVersionId
    this.existsRecordId = rawData.existsRecordId
    this.priceGroup = rawData.priceGroup
    this.priceList = rawData.priceList
    this.description = rawData.description
    this.panelCode = rawData.panel
    this.panelName = rawData.panelName
    this.price = rawData.price
    this.minSp = rawData.minSp
    this.maxSp = rawData.maxSp
    this.maxDis = rawData.maxDis
    this.fixedPrice = rawData.fixedPrice
    this.enteredBy = rawData.enteredBy
    this.status = rawData.status
    this.environment = rawData.environment
    this.dateCreation = rawData.dateCreation
    this.dateActive = rawData.dateActive
    this.dateExpire = rawData.dateExpire
    this.version = rawData.existsVersionId
    this.dateOfEntry = rawData.dateOfEntry
    this.lastUpdated = rawData.lastUpdated
  }
}
