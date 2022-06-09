export class PatientOrder {
  _id: string;
  pId: number;
  age: number;
  ageUnits: string;
  orderId: number;
  labId: number;
  visitId: string;
  rLab: string;
  patientName: string;
  panelCode: any[];
  packageList: [
    {
      panelCode: string;
      panelName: string;
      packageCode: string;
      serviceType: string;
      service: string;
      department: string;
      section: string;
      pLab: string;
      rLab: string;
      bill: boolean;
      grossAmt: number;
      netAmt: number;
      discount: number;
      dueDate: Date;
      resultDate: Date;
      abnFlag: boolean;
      cretical: boolean;
      orderStatus: string;
      status: string;
      extraData: {
        priority: string;
        outsourceLab: string;
        forceOutSource: string;
        osReceivedDate: string;
        osReceivedBy: string;
        outsourceStatus: string;
        receviedByDept: string;
        analysisDoneDate: string;
        autoRelease: string;
        abNormal: string;
        critical: string;
        rep: string;
        eqid: string;
        eqtype: string;
        methodOn: string;
        methodName: string;
        porder: string;
        confidential: string;
        workflow: string;
        loginServgrp: string;
        currentServgrp: string;
        routingStatus: string;
        recvTime: string;
        outSourceOrdno: string;
        deptOutSource: string;
        comment: string;
      };
    },
  ];
  environment: string;
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.pId = rawData.pId;
    this.age = rawData.age;
    this.ageUnits = rawData.ageUnits;
    this.orderId = rawData.orderId;
    this.labId = rawData.labId;
    this.visitId = rawData.visitId;
    this.rLab = rawData.rLab;
    this.patientName = rawData.patientName;
    this.panelCode = rawData.panelCode;
    this.packageList = rawData.packageList;
    this.environment = rawData.environment;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}

export class SelectedItems {
  panels: any[];
  serviceTypes: string[];
  constructor(rawData: {[key in string]: any}) {
    this.panels = rawData.panels;
    this.serviceTypes = rawData.serviceTypes;
  }
}
