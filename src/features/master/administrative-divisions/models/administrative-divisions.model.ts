export class AdministrativeDivisions {
  _id: string;
  country: string;
  state: string;
  district: string;
  city: string;
  area: string;
  postalCode: Array<string>;
  sbu: string;
  zone: string;
  environment: string;
  companyCode: string;
  status: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id;
    this.country = rawData.country;
    this.state = rawData.state;
    this.district = rawData.district;
    this.city = rawData.city;
    this.area = rawData.area;
    this.postalCode = rawData.postalCode;
    this.sbu = rawData.sbu;
    this.zone = rawData.zone;
    this.companyCode = rawData.companyCode;
    this.status = rawData.status;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
export class LocalInput {
  postalCode: string;
  constructor(rawData: { [key in string]: any }) {
    this.postalCode = rawData.postalCode;
  }
}
