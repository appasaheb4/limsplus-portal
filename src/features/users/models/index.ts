export interface Login {
  lab?: string
  userId?: string
  password?: string
}

export interface Users {
  _id?: string
  userId?: string
  lab?: string
  password?: string
  passChanged?: boolean
  deginisation?: string
  status?: string | "Active" | "Retired" | "Disable"
  fullName?: string
  department?: string
  exipreDate?: Date
  exipreDays?: number
  role?: string
}

export interface ChangePassword {
  oldPassword?: string
  newPassword?: string
  confirmPassword?: string
}
