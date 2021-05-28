import * as Models from "@lp/features/users/models"

export interface PaientManger{
  internalPid?: string,
  mobileNo?: string,
  title?: string,
  firstName?: string,
  middleName?: string,
  lastName?: string,
  sex?: string,
  address?: string,
  city?: string,
  state?: string,
  country?: string,
  postcode?: string,
  email?: string,
  permanent?: boolean,
  vip?: boolean
}


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
