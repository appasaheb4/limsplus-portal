import * as Models from "@lp/features/users/models"
export interface User extends Models.Users {
  _id?: string
  user?: Models.Users
  userPermissions?: [string]
  pages?: [string]
}
