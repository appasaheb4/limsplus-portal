export interface IRole {
  _id?: string
  role?: any
  rolePermission?: [any]
}

export interface RoleMapping {
  code?: string
  description?: string
  dateOfEntry?: string;
  lastUpdated?: string
}
