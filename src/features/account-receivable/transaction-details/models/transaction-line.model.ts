export class TransactionLine {
  _id: string;
  headerId: number;
  lineId: number;
  rLab: string;
  pLab: number;
  collectionCenter: string;
  collectionCenterName: string;
  corporateCode: string;
  invoiceAC: string;
  invoiceDate: Date;
  actionDate: Date;
  receipt: string;
  pId: string;
  labId: string;
  acSub: string;
  department: string;
  serviceType: string;
  panelCode: string;
  panelName: string;
  priceGroup: string;
  priceList: string;
  grossAmount: number;
  netAmount: number;
  discount: number;
  miscCharges: number;
  transaction: string;
  acClass: string;
  accountType: string;
  customerGroup: string;
  companyCode: string;
  environment: string;
  status: string;
  enteredBy: string;
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id;
    this.headerId = rawData.headerId;
    this.lineId = rawData.lineId;
    this.rLab = rawData.rLab;
    this.pLab = rawData.pLab;
    this.collectionCenter = rawData.collectionCenter;
    this.collectionCenterName = rawData.collectionCenterName;
    this.corporateCode = rawData.corporateCode;
    this.invoiceAC = rawData.invoiceAC;
    this.invoiceDate = rawData.invoiceDate;
    this.actionDate = rawData.actionDate;
    this.receipt = rawData.receipt;
    this.pId = rawData.pId;
    this.labId = rawData.labId;
    this.acSub = rawData.acSub;
    this.department = rawData.department;
    this.serviceType = rawData.serviceType;
    this.panelCode = rawData.panelCode;
    this.panelName = rawData.panelName;
    this.priceGroup = rawData.priceGroup;
    this.priceList = rawData.priceList;
    this.grossAmount = rawData.grossAmount;
    this.netAmount = rawData.netAmount;
    this.discount = rawData.discount;
    this.miscCharges = rawData.miscCharges;
    this.transaction = rawData.transaction;
    this.acClass = rawData.acClass;
    this.accountType = rawData.accountType;
    this.customerGroup = rawData.customerGroup;
    this.companyCode = rawData.companyCode;
    this.environment = rawData.environment;
    this.status = rawData.status;
    this.enteredBy = rawData.enteredBy;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
