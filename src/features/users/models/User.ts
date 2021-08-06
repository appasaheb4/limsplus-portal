import * as ModelsLab from "../..//collection/labs/models"
import * as ModelsDepartment from "../../collection/department/models"
import * as ModelsRole from "../../collection/roles/models"
export class Users {
  _id: string
  userId: string
  empCode: string
  defaultLab: string   
  lab: ModelsLab.Labs[]
  password: string
  passChanged: boolean
  deginisation: string
  fullName: string
  mobileNo: string
  contactNo: string
  email: string
  dateOfBirth: number
  marriageAnniversary: number
  userDegree: string
  department: ModelsDepartment.Department[]
  exipreDate: number
  expireDays: number
  role: ModelsRole.IRole[]
  validationLevel: number
  workstation: string
  ipAddress: string
  dateOfEntry: number
  createdBy: string
  confidential: boolean
  signature: any
  picture: any
  status: string
  environment: string

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
    this.userId = rawData.userId
    this.empCode = rawData.empCode
    this.defaultLab = rawData.defaultLab
    this.lab = rawData.lab
    this.password = rawData.password
    this.passChanged = rawData.passChanged
    this.deginisation = rawData.deginisation
    this.fullName = rawData.fullName
    this.mobileNo = rawData.mobileNo
    this.contactNo = rawData.contactNo
    this.email = rawData.email
    this.dateOfBirth = rawData.dateOfBirth
    this.userDegree = rawData.userDegree
    this.department = rawData.department
    this.exipreDate = rawData.exipreDate
    this.expireDays = rawData.expireDays
    this.role = rawData.role
    this.validationLevel = rawData.validationLevel
    this.workstation = rawData.workstation
    this.ipAddress = rawData.ipAddress  
    this.dateOfEntry = rawData.dateOfEntry
    this.createdBy = rawData.createdBy
    this.confidential = rawData.confidential
    this.signature = rawData.signature   
    this.picture = rawData.picture
    this.marriageAnniversary = rawData.marriageAnniversary
    this.status = rawData.status
    this.environment = rawData.environment
  }
}
