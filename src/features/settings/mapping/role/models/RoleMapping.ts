export class Role {
  _id: string;
  role: any;
  rolePermission: any[];
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.role = rawData.role;
    this.rolePermission = rawData.rolePermission;
  }
}

export class RoleMapping {
  code: string;
  description: string;
  dateOfEntry: string;
  lastUpdated: string;
  constructor(rawData: {[key in string]: any}) {
    this.code = rawData.code;
    this.description = rawData.description;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
