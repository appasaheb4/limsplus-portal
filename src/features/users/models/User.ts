import * as ModelsLab from "../..//collection/labs/models"
import * as ModelsDepartment from "../../collection/department/models"
import * as ModelsRole from "../../collection/roles/models"
export class Users {
  _id: string
  userId: string
  defaultLab: string
  lab: ModelsLab.Labs[]
  password: string
  passChanged: boolean
  deginisation: string
  status: string
  fullName: string
  mobileNo: string
  email: string
  department: ModelsDepartment.Department[]
  exipreDate: Date
  exipreDays: number
  role: ModelsRole.IRole[]
  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
    this.userId = rawData.userId
    this.defaultLab = rawData.defaultLab
    this.lab = rawData.lab
    this.password = rawData.password
    this.passChanged = rawData.passChanged
    this.deginisation = rawData.deginisation
    this.status = rawData.status
    this.fullName = rawData.fullName
    this.mobileNo = rawData.mobileNo
    this.email = rawData.email
    this.department = rawData.department
    this.exipreDate = rawData.exipreDate
    this.exipreDays = rawData.exipreDays
    this.role = rawData.role
  }
}
