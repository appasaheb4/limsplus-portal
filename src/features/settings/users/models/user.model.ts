import * as ModelsLab from '@/features/master/labs/models';
import * as ModelsDepartment from '@/features/master/department/models';
import * as ModelsRole from '@/features/settings/roles/models';
export class Users {
  _id: string;
  existsVersionId: string;
  existsRecordId: string;
  defaultLab: string;
  defaultDepartment: string;
  userGroup: string;
  userModule: string;
  userId: string;
  fullName: string;
  empCode: string;
  reportingTo: string;
  deginisation: string;
  userDegree: string;
  role: ModelsRole.Role[];
  password: string;
  lab: ModelsLab.Labs[];
  department: ModelsDepartment.Department[];
  corporateClient: Array<any>;
  registrationLocation: Array<any>;
  mobileNo: string;
  contactNo: string;
  email: string;
  signature: any;
  picture: any;
  validationLevel: number;
  dateOfBirth: Date;
  marriageAnniversary: Date;
  exipreDate: Date;
  expireDays: number;
  confidential: boolean;
  confirguration: boolean;
  systemInfo: {
    ipAddress?: any[];
    workstation?: any[];
    accessInfo: {
      mobile: boolean;
      desktop: boolean;
    };
  };
  dateCreation: Date;
  dateActive: Date;
  createdBy: string;
  companyCode: string;
  status: string;
  version: number;
  environment: string;
  passChanged: boolean;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id;
    this.existsVersionId = rawData.existsVersionId;
    this.existsRecordId = rawData.existsRecordId;
    this.defaultLab = rawData.defaultLab;
    this.defaultDepartment = rawData.defaultDepartment;
    this.userGroup = rawData.userGroup;
    this.userModule = rawData.userModule;
    this.userId = rawData.userId;
    this.fullName = rawData.fullName;
    this.empCode = rawData.empCode;
    this.reportingTo = rawData.reportingTo;
    this.deginisation = rawData.deginisation;
    this.userDegree = rawData.userDegree;
    this.role = rawData.role;
    this.password = rawData.password;
    this.lab = rawData.lab;
    this.department = rawData.department;
    this.corporateClient = rawData.corporateClient;
    this.registrationLocation = rawData.registrationLocation;
    this.mobileNo = rawData.mobileNo;
    this.contactNo = rawData.contactNo;
    this.email = rawData.email;
    this.signature = rawData.signature;
    this.picture = rawData.picture;
    this.validationLevel = rawData.validationLevel;
    this.dateOfBirth = rawData.dateOfBirth;
    this.marriageAnniversary = rawData.marriageAnniversary;
    this.exipreDate = rawData.exipreDate;
    this.expireDays = rawData.expireDays;
    this.confidential = rawData.confidential;
    this.confirguration = rawData.confirguration;
    this.systemInfo = rawData.systemInfo;
    this.dateCreation = rawData.dateCreation;
    this.dateActive = rawData.dateActive;
    this.createdBy = rawData.createdBy;
    this.companyCode = rawData.companyCode;
    this.status = rawData.status;
    this.version = rawData.version;
    this.environment = rawData.environment;
    this.passChanged = rawData.passChanged;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}

export class SelectedItems {
  roles: any[];
  labs: any[];
  department: any[];
  corporateClient: any[];
  registrationLocation: any[];
  constructor(rawData: { [key in string]: any }) {
    this.roles = rawData.roles;
    this.labs = rawData.labs;
    this.department = rawData.department;
    this.corporateClient = rawData.corporateClient;
    this.registrationLocation = rawData.registrationLocation;
  }
}
