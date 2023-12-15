export class Company {
  _id: string;
  code: string;
  name: string;
  description: string;
  module: Array<string>;
  lab: string;
  allowedLab: Array<string>;
  department: string;
  allowedUser: number;
  allowedInstrument: Array<string>;
  admin: string;
  password: string;
  postalCode: number;
  country: string;
  state: string;
  district: string;
  city: string;
  area: string;
  address: string;
  mobileNo: string;
  contactNo: string;
  email: string;
  web: string;
  webPortal: string;
  registeredOffice: string;
  corporateOffice: string;
  customerCare: string;
  gst: string;
  sacCode: string;
  cinNo: string;
  companyLogo: any;
  fyiLine: string;
  workLine: string;
  dateCreation: Date;
  dateActive: Date;
  dateExpire: Date;
  supportPlan: string;
  enteredBy: string;
  version: number;
  status: string;
  environment: Array<string>;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id;
    this.code = rawData.code;
    this.name = rawData.name;
    this.description = rawData.description;
    this.module = rawData.module;
    this.lab = rawData.lab;
    this.allowedLab = rawData.allowedLab;
    this.department = rawData.department;
    this.allowedUser = rawData.allowedUser;
    this.allowedInstrument = rawData.allowedInstrument;
    this.admin = rawData.admin;
    this.password = rawData.password;
    this.postalCode = rawData.postalCode;
    this.country = rawData.country;
    this.state = rawData.state;
    this.district = rawData.district;
    this.city = rawData.city;
    this.area = rawData.area;
    this.address = rawData.address;
    this.mobileNo = rawData.mobileNo;
    this.contactNo = rawData.contactNo;
    this.email = rawData.email;
    this.web = rawData.web;
    this.webPortal = rawData.webPortal;
    this.registeredOffice = rawData.registeredOffice;
    this.corporateOffice = rawData.corporateOffice;
    this.customerCare = rawData.customerCare;
    this.gst = rawData.gst;
    this.sacCode = rawData.sacCode;
    this.cinNo = rawData.cinNo;
    this.fyiLine = rawData.fyiLine;
    this.workLine = rawData.workLine;
    this.dateCreation = rawData.dateCreation;
    this.dateActive = rawData.dateActive;
    this.dateExpire = rawData.dateExpire;
    this.supportPlan = rawData.supportPlan;
    this.enteredBy = rawData.enteredBy;
    this.version = rawData.version;
    this.status = rawData.status;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}

export class SelectedItems {
  allowedLab: any[];
  allowedInstrument: any[];
  constructor(rawData: { [key in string]: any }) {
    this.allowedLab = rawData.allowedLab;
    this.allowedInstrument = rawData.allowedInstrument;
  }
}
