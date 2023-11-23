export class Banner {
  _id: string;
  title: string;
  file: any;
  image: string;
  status: string;
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id;
    this.title = rawData.title;
    this.file = rawData.file;
    this.image = rawData.image;
    this.status = rawData.status;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
