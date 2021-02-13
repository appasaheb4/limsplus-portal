import * as ModelsLab from "../..//collection/labs/models"
import * as ModelsDepartment from "../../collection/department/models"
import * as ModelsRole from "../../collection/roles/models"

export interface Users {
  _id?: string
  userId?: string
  defaultLab?: string
  lab?: ModelsLab.Labs[]
  password?: string
  passChanged?: boolean
  deginisation?: string
  status?: string | "Active" | "Retired" | "Disable"
  fullName?: string
  mobileNo?: string
  email?: string
  department?: ModelsDepartment.IDepartment[]
  exipreDate?: Date
  exipreDays?: number
  role?: ModelsRole.IRole[]
}

export interface ChangePassword {
  oldPassword?: string
  newPassword?: string
  confirmPassword?: string
  title?: string
  subTitle?: string
  tempHide?: boolean
}
