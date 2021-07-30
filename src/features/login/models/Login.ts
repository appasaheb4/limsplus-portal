export class Login {
  _id: string
  lab: string
  labList: any[]
  role: string
  roleList: any[]
  userId: string
  fullName: string
  password: string
  passChanged: boolean
  loginActivityId: string
  exipreDate: Date
  accessToken: string
  refreshToken: string
  roleMapping: any
  picture: string
  shortcutMenu: any
  sessionTimeoutCount: number
  sessionAllowed: string
  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id
    this.lab = rawData.lab
    this.labList = rawData.labList
    this.role = rawData.role
    this.roleList = rawData.roleList
    this.userId = rawData.userId
    this.fullName = rawData.fullName
    this.password = rawData.password
    this.passChanged = rawData.passChanged
    this.loginActivityId = rawData.loginActivityId
    this.exipreDate = rawData.exipreDate
    this.accessToken = rawData.accessToken
    this.refreshToken = rawData.refreshToken
    this.roleMapping = rawData.roleMapping
    this.picture = rawData.picture
    this.shortcutMenu = rawData.shortcutMenu
    this.sessionTimeoutCount = rawData.sessionTimeoutCount
    this.sessionAllowed = rawData.sessionAllowed
  }
}
