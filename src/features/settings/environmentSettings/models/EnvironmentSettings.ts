import * as Models from "@lp/features/users/models"
export class SessionManagement {
  _id?: string
  lab?: any[]
  user?: Models.Users[]
  department?: any[]
  variable?: "SESSION_TIMEOUT" | "SESSION_ALLOWED" | string
  value?: string
  descriptions?: string
  documentType?: string
  environment: string
  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
    this.lab = rawData.lab
    this.user = rawData.user
    this.department = rawData.department
    this.variable = rawData.variable
    this.value = rawData.value
    this.descriptions = rawData.descriptions
    this.documentType = rawData.documentType
    this.environment = rawData.environment
  }
}
