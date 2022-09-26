export class Payment {
  _id: string;
  pId: number;
  labId: number;
  rLab: string;
  invoiceAC: number;
  customerName: string;
  customerGroup: string;
  acClass: string;
  acType: string;
  discountType: string;
  invoiceDate: Date;
  grossAmount: number;
  netAmount: number;
  discountAmount: number;
  discountPer: number;
  miscCharges: object;
  amountPayable: number;
  receivedAmount: number;
  balance: number;
  modeOfPayment: string;
  paymentRemark: string;
  status: string;
  enteredBy: string;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.pId = rawData.pId;
    this.labId = rawData.labId;
    this.rLab = rawData.rLab;
    this.invoiceAC = rawData.invoiceAC;
    this.customerName = rawData.customerName;
    this.customerGroup = rawData.customerGroup;
    this.acClass = rawData.acClass;
    this.acType = rawData.acType;
    this.discountType = rawData.discountType;
    this.invoiceDate = rawData.invoiceAC;
    this.grossAmount = rawData.grossAmount;
    this.netAmount = rawData.netAmount;
    this.discountAmount = rawData.discountAmount;
    this.discountPer = rawData.discountPer;
    this.miscCharges = rawData.miscCharges;
    this.amountPayable = rawData.amountPayable;
    this.receivedAmount = rawData.receivedAmount;
    this.balance = rawData.balance;
    this.modeOfPayment = rawData.modeOfPayment;
    this.paymentRemark = rawData.paymentRemark;
    this.status = rawData.status;
    this.enteredBy = rawData.enteredBy;
  }
}
