export class CommentManager {
  _id: string;
  existsVersionId: string;
  existsRecordId: string;
  code: number;
  libraryCode: string;
  lab: string;
  department: string;
  position: string;
  groups: string;
  libraryType: string;
  parameter: string;
  editable: boolean;
  details: string;
  status: string;
  enteredBy: string;
  dateCreation: Date;
  dateActive: Date;
  dateExpire: Date;
  versions: number;
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.existsVersionId = rawData.existsVersionId;
    this.existsRecordId = rawData.existsRecordId;
    this.code = rawData.code;
    this.libraryCode = rawData.libraryCode;
    this.lab = rawData.lab;
    this.department = rawData.department;
    this.position = rawData.position;
    this.groups = rawData.groups;
    this.libraryType = rawData.libraryType;
    this.parameter = rawData.parameter;
    this.editable = rawData.editable;
    this.details = rawData.details;
    this.status = rawData.status;
    this.enteredBy = rawData.enteredBy;
    this.dateCreation = rawData.dateCreation;
    this.dateActive = rawData.dateActive;
    this.dateExpire = rawData.dateExpire;
    this.versions = rawData.versions;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
