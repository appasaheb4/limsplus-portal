export class SampleContainer {
  _id: string;
  containerCode: string;
  containerName: string;
  tubeName: string;
  description: string;
  image: any;
  companyCode: string;
  status: string;
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id;
    this.containerCode = rawData.containerCode;
    this.containerName = rawData.containerName;
    this.tubeName = rawData.tubeName;
    this.description = rawData.description;
    this.image = rawData.image;
    this.companyCode = rawData.companyCode;
    this.status = rawData.status;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
