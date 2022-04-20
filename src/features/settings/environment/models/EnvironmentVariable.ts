export class EnvironmentVariable {
  _id: string;
  environmentVariable: string;
  category: string;
  descriptions: string;
  enteredBy: string;
  allLabs: boolean;
  allUsers: boolean;
  allDepartment: boolean;
  isModify: boolean;
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.environmentVariable = rawData.environmentVariable;
    this.category = rawData.category;
    this.descriptions = rawData.descriptions;
    this.enteredBy = rawData.enteredBy;
    this.allLabs = rawData.allLabs;
    this.allDepartment = rawData.allDepartment;
    this.allUsers = rawData.allUsers;
    this.isModify = rawData.isModify;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}

export class Permission {
  allLabs: boolean;
  allUsers: boolean;
  allDepartment: boolean;
  constructor(rawData: {[key in string]: any}) {
    this.allLabs = rawData.allLabs;
    this.allUsers = rawData.allUsers;
    this.allDepartment = rawData.allDepartment;
  }
}
