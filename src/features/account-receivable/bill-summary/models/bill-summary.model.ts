export class BillSummary {
  _id: string;
  billNo: string;
  billDate: Date;
  corporateCode: string;
  corporateName: string;
  invoiceAC: number;
  clientContactNo: string;
  billFrequency: string;
  billFrom: Date;
  billTo: Date;
  accountType: string;
  customerGroup: string;
  billingOn: string;
  grossAmount: number;
  netAmount: number;
  missCharges: number;
  otherCharges: number;
  paidAmount: number;
  balance: number;
  status: string;
  enteredBy: string;
  companyCode: string;
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id;
    this.billNo = rawData.billNo;
    this.billDate = rawData.billDate;
    this.corporateCode = rawData.corporateCode;
    this.corporateName = rawData.corporateName;
    this.invoiceAC = rawData.invoiceAC;
    this.clientContactNo = rawData.clientContactNo;
    this.billFrequency = rawData.billFrequency;
    this.billFrom = rawData.billFrom;
    this.billTo = rawData.billTo;
    this.accountType = rawData.accountType;
    this.customerGroup = rawData.customerGroup;
    this.billNo = rawData.billNo;
    this.billingOn = rawData.billingOn;
    this.grossAmount = rawData.grossAmount;
    this.netAmount = rawData.netAmount;
    this.missCharges = rawData.missCharges;
    this.otherCharges = rawData.otherCharges;
    this.paidAmount = rawData.paidAmount;
    this.balance = rawData.balance;
    this.status = rawData.status;
    this.enteredBy = rawData.enteredBy;
    this.companyCode = rawData.companyCode;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
