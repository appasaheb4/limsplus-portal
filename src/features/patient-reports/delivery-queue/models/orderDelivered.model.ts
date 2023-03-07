export class OrderDelivered {
  _id: string;
  deliveryId: number;
  labId: string;
  orderId: string;
  resultType: string;
  panelCode: string;
  panelName: string;
  testCode: string;
  testName: string;
  analyteCode: string;
  analyteName: string;
  rep: number;
  delivered: boolean;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.deliveryId = rawData.deliveryId;
    this.labId = rawData.labId;
    this.orderId = rawData.orderId;
    this.resultType = rawData.resultType;
    this.panelCode = rawData.panelCode;
    this.panelName = rawData.panelName;
    this.testCode = rawData.testCode;
    this.testName = rawData.testName;
    this.analyteCode = rawData.analyteCode;
    this.analyteName = rawData.analyteName;
    this.rep = rawData.rep;
    this.delivered = rawData.delivered;
  }
}
