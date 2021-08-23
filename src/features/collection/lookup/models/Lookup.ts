export class Lookup {
  documentName: object
  fieldName: string
  code: string
  value: string
  arrValue: { value?: string | undefined; code?: string | undefined }[]
  description: string
  defaultItem: Array<{ value?: string; code?: string }>
  environment: string

  constructor(rawData: { [key in string]: any }) {
    this.documentName = rawData.documentName
    this.fieldName = rawData.fieldName
    this.code = rawData.code
    this.value = rawData.value
    this.arrValue = rawData.arrValue
    this.description = rawData.description
    this.defaultItem = rawData.defaultItem
    this.environment = rawData.environment
  }
}
