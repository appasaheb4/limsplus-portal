export class LoginActivity {
  _id: string;
  user: {};
  systemInfo: {};
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.user = rawData.user;
    this.systemInfo = rawData.systemInfo;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
