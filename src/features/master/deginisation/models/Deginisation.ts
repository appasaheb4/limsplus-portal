export class Deginisation {
  _id: string;
  code: string;
  description: string;
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.code = rawData.code;
    this.description = rawData.description;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
