export class PendingPanelApproval {
  _id: string;
  labId: number;
  sampleId: number;
  sampleType: string;
  containerId: number;
  panel: string;
  dueDate: Date;
  status: string;
  comments: string;
  pLab: string;
  department: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.labId = rawData.labId;
    this.sampleId = rawData.sampleId;
    this.sampleType = rawData.sampleType;
    this.containerId = rawData.containerId;
    this.panel = rawData.panel;
    this.dueDate = rawData.dueDate;
    this.status = rawData.status;
    this.comments = rawData.comments;
    this.pLab = rawData.pLab;
    this.department = rawData.department;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
