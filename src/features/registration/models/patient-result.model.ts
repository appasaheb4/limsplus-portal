export class PatientResult {
  pLab: string;
  labId: number;
  reportOrder: number;
  constructor(rawData: {[key in string]: any}) {
    this.pLab = rawData.pLab;
    this.labId = rawData.labId;
    this.reportOrder = rawData.reportOrder;
  }
}
