import * as Models from "@lp/features/users/models"
export interface SessionManagement {
  _id?: string
  lab?: any[]
  user?: Models.Users[]
  department?: any[]
  variable?: "SESSION_TIMEOUT" | "SESSION_ALLOWED" | string
  value?: string
  descriptions?: string
  documentType?: string
}
