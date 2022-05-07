export class PatientResult {
  pLab: string;
  labId: number;
  constructor(rawData: {[key in string]: any}) {
    this.pLab = rawData.pLab;
    this.labId = rawData.labId;
  }
}
