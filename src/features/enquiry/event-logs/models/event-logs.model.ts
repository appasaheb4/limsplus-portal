export class EventLogs {
  _id: string;
  documents: string;
  pId: number;
  labId: number;
  rLab: string;
  sampleId: string;
  pLab: string;
  department: string;
  panelCode: string;
  testCode: string;
  analyteCode: string;
  event: string;
  eventOn: string;
  oldValue: string;
  newValue: string;
  eventDate: Date;
  eventBy: string;
  comments: string;
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id;
    this.documents = rawData.documents;
    this.pId = rawData.pId;
    this.labId = rawData.labId;
    this.rLab = rawData.rLab;
    this.sampleId = rawData.sampleId;
    this.pLab = rawData.pLab;
    this.department = rawData.department;
    this.panelCode = rawData.panelCode;
    this.testCode = rawData.testCode;
    this.analyteCode = rawData.analyteCode;
    this.event = rawData.event;
    this.eventOn = rawData.eventOn;
    this.oldValue = rawData.oldValue;
    this.newValue = rawData.newValue;
    this.eventDate = rawData.eventDate;
    this.eventBy = rawData.eventBy;
    this.comments = rawData.comments;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
