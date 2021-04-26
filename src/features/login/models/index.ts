export interface ILogin {
  _id?: string
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
  image?: string
}

export interface ForgotPassword {
  userId?: string
  email?: string
  mobileNo?: string
}
