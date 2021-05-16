export interface ILogin {
  _id?: string
  lab?: string
  labList?: any[]
  role?: string
  roleList?: any[]
  userId?: string
  fullName?: string
  password?: string
  passChanged?: boolean
  loginActivityId?: string
  exipreDate?: Date
  token?: string
  roleMapping?: any
  image?: string   
  shortcutMenu?: any
  sessionTimeoutCount?: number
  sessionAllowed?: string
}

export interface ForgotPassword {
  userId?: string
  email?: string
  mobileNo?: string
}
