export class PatientResult {
  pLab: string;
  labId: number;
  reportOrder: number;
  flagUpdate: boolean;
  constructor(rawData: { [key in string]: any }) {
    this.pLab = rawData.pLab;
    this.labId = rawData.labId;
    this.reportOrder = rawData.reportOrder;
    this.flagUpdate = rawData.flagUpdate;
  }
}

export class DistinctPatientResult {
  readonly department: Array<{ _id: string; count: number }>;
  readonly testCodeName: Array<{ _id: string; count: number }>;
  readonly labId: Array<{ _id: string; count: number }>;
  readonly sampleId: Array<{ _id: string; count: number }>;
  readonly name: Array<{ _id: string; count: number }>;
  constructor(rawData: { [key in string]: any }) {
    this.department = rawData.data;
    this.testCodeName = rawData.testCodeName;
    this.labId = rawData.labId;
    this.sampleId = rawData.sampleId;
    this.name = rawData.name;
  }
}
