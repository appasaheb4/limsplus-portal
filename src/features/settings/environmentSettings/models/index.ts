import * as Models from "@lp/features/users/models"
export interface EnvironmentSettings {
  _id?: string
  lab?: string
  user?: Models.Users
  department?: string
  variable?: "SESSION_TIMEOUT" | "SESSION_ALLOWED"
  value?: string
  descriptions?: string
}   
