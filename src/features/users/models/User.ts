import * as ModelsLab from "../..//collection/labs/models"
import * as ModelsDepartment from "../../collection/department/models"
import * as ModelsRole from "../../settings/roles/models"
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
  dateOfBirth: Date
  marriageAnniversary: Date
  userDegree: string
  department: ModelsDepartment.Department[]
  exipreDate: Date
  expireDays: number
  role: ModelsRole.Role[]
  validationLevel: number
  workstation: string
  ipAddress: string
  createdBy: string
  confidential: boolean
  signature: any
  picture: any
  status: string
  environment: string
  confirguration: boolean
  dateOfEntry: Date
  lastUpdated: Date

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
    this.createdBy = rawData.createdBy 
    this.confidential = rawData.confidential 
    this.signature = rawData.signature 
    this.picture = rawData.picture 
    this.marriageAnniversary = rawData.marriageAnniversary 
    this.status = rawData.status 
    this.environment = rawData.environment 
    this.confirguration = rawData.confirguration 
    this.dateOfEntry = rawData.dateOfEntry 
    this.lastUpdated = rawData.lastUpdated 
  }   
}
