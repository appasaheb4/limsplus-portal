export class Lookup {
  _id: string
  documentName: object  
  fieldName: string
  arrValue: { value: string; code: string }[]
  description: string
  defaultItem: Array<{ value: string; code: string }>
  environment: string

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
    this.documentName = rawData.documentName
    this.fieldName = rawData.fieldName
    this.arrValue = rawData.arrValue
    this.description = rawData.description
    this.defaultItem = rawData.defaultItem
    this.environment = rawData.environment
  }
}

export class LocalInput{
  code: string
  value: string
  constructor(rawData: { [key in string]: any }) {
    this.code = rawData.code
    this.value = rawData.value
  }
}
