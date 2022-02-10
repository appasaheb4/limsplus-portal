import * as Models from "@/features/settings/users/models"
export class EnvironmentSettings {
  _id: string
  lab: any[]
  user: Models.Users[]
  department: any[]
  variable: string
  value: string
  descriptions: string
  allLabs: boolean
  allUsers: boolean
  allDepartment: boolean
  environment: string
  documentType: string
  dateOfEntry: Date
  lastUpdated: Date
  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
    this.lab = rawData.lab
    this.user = rawData.user
    this.department = rawData.department
    this.variable = rawData.variable
    this.value = rawData.value 
    this.descriptions = rawData.descriptions
    this.allLabs = rawData.allLabs  
    this.allDepartment = rawData.allDepartment
    this.allUsers = rawData.allUsers
    this.documentType = rawData.documentType
    this.environment = rawData.environment
    this.dateOfEntry = rawData.dateOfEntry
    this.lastUpdated = rawData.lastUpdated
  }
}

export class SelectedItems {
  users: any[]
  labs: any[]
  department: any[]
  constructor(rawData: { [key in string]: any }) {
    this.users = rawData.users
    this.labs = rawData.labs
    this.department = rawData.department
  }
}
