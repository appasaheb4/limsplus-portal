export interface ILogin {
  lab?: string
  role?: string
  userId?: string
  fullName?: string
  password?: string
  passChanged?: boolean
  loginActivityId?: string
  exipreDate?: Date
  token?: string
  roleMapping?: any
}

export interface ForgotPassword {
  userId?: string
  email?: string
  mobileNo?: string
}
