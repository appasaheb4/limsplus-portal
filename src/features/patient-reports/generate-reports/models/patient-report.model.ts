export class PatientReport {
  _id: string;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
  }
}
