export class PatientVisit {
  pId: number
  patientName: string
  rLab: string
  visitId: string
  labId: number | string
  visitDate: Date
  registrationDate: Date
  collectionDate: Date
  dueDate: Date
  birthDate: Date
  age: number
  ageUnits: string
  collectionCenter: string
  collectionCenterName: string  
  corporateCode: string
  corporateName: string
  acClass: string
  doctorId: string
  doctorName: string
  deliveryType: string
  history: boolean
  status: string
  extraData: {
    accountType: string
    deliveryMethod: string
    additionalInfo: string
    invoiceAc: string
    billingMethod: string
    billNumber: string
    urgent: boolean
    confidental: boolean
    autoNumber: string
    methodCollection: string
    collectedBy: string
    pendingDataEntry: boolean
    receivedDate: Date
    resultDate: Date
    approvalDate: Date
    approvalStatus: string
    reportStatus: string
    reportedDate: Date
    enteredBy: string
    gestation: string
    height: string
    weight: string
    archieve: string
    loginInterface: string
    registrationInterface: string
    submittedSystem: string
    submittedOn: string
    balance: string
    environment: string
  }   
  documentType: string
  dateOfEntry: Date
  lastUpdated: Date

  constructor(rawData: { [key in string]: any }) {
    this.pId = rawData.pId
    this.patientName = rawData.patientName
    this.rLab = rawData.rLab
    this.visitId = rawData.visitId
    this.labId = rawData.labId
    this.visitDate = rawData.visitDate
    this.registrationDate = rawData.registrationDate
    this.collectionDate = rawData.collectionDate
    this.dueDate = rawData.dueDate
    this.birthDate = rawData.birthDate
    this.age = rawData.age
    this.ageUnits = rawData.ageUnits
    this.collectionCenter = rawData.collectionCenter
    this.collectionCenterName = rawData.collectionCenterName
    this.corporateCode = rawData.corporateCode
    this.corporateName = rawData.corporateName
    this.acClass = rawData.acClass
    this.doctorId = rawData.doctorId
    this.doctorName = rawData.doctorName
    this.deliveryType = rawData.deliveryType
    this.history = rawData.history
    this.status = rawData.status
    this.extraData = rawData.extraData
    this.documentType = rawData.documentType
    this.dateOfEntry = rawData.dateOfEntry
    this.lastUpdated = rawData.lastUpdated
  }
}
