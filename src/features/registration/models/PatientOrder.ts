export class PatientOrder {
  orderId: number
  visitId: string
  patientName: string
  labId: string
  panelCode: any[]
  panelName: any[]
  package: any[]
  packageCode: string[]
  packageName: string[]
  department: string
  section: string
  bill: string
  containerId: string
  serviceType: string
  sampleId: string
  rLab: string
  pLab: string
  orderStatus: string
  extraData: {
    outSourceLab: string
    forceOutSource: boolean
    currentDepartment: string
    dueDate: Date
    resultDate: Date
    status: string
    comments: string
    osStatus: string
    osReceivedDate: string
    osReceivedBy: string
    autoRelease: boolean
    abNormal: boolean
    critical: boolean
    reTest: string
    reRun: string
    qty: string
    rep: string
    instrumentType: string
    instrumentId: string
    methodOn: string
    methodName: string
    priority: string
    confidental: boolean
    packageVersion: string
    panelVersion: string
    environment: string
  }
  outSourceLab: string
  forceOutSource: boolean
  currentDepartment: string
  dueDate: Date
  resultDate: Date
  status: string
  comments: string
  osStatus: string
  osReceivedDate: string
  osReceivedBy: string
  autoRelease: boolean
  abNormal: boolean
  critical: boolean
  reTest: string
  reRun: string
  qty: string
  rep: string
  instrumentType: string
  instrumentId: string
  methodOn: string
  methodName: string
  priority: string
  confidental: boolean
  packageVersion: string
  panelVersion: string
  environment: string

  constructor(rawData: { [key in string]: any }) {
    this.orderId = rawData.orderId
    this.visitId = rawData.visitId
    this.panelCode = rawData.panelCode
    this.panelName = rawData.panelName
    this.package = rawData.package
    
    this.patientName = rawData.patientName
    this.labId = rawData.labId
    this.packageCode = rawData.packageCode
    this.packageName = rawData.packageName
   
    this.bill = rawData.bill
    this.containerId = rawData.containerId
    this.serviceType = rawData.serviceType
    this.sampleId = rawData.sampleId
    this.department = rawData.department
    this.section = rawData.section
    this.rLab = rawData.rLab
    this.pLab = rawData.pLab
    this.orderStatus = rawData.orderStatus

    this.extraData = rawData.extraData

    this.outSourceLab = rawData.outSourceLab
    this.currentDepartment = rawData.currentDepartment
    this.dueDate = rawData.dueDate
    this.resultDate = rawData.resultDate
    this.status = rawData.status
    this.comments = rawData.comments
    this.forceOutSource = rawData.forceOutSource
    this.osStatus = rawData.osStatus
    this.osReceivedDate = rawData.osReceivedDate
    this.osReceivedBy = rawData.osReceivedBy
    this.autoRelease = rawData.autoRelease
    this.abNormal = rawData.abNormal
    this.critical = rawData.critical
    this.reTest = rawData.reTest
    this.reRun = rawData.reRun
    this.qty = rawData.qty
    this.rep = rawData.rep
    this.instrumentType = rawData.instrumentType
    this.instrumentId = rawData.instrumentId
    this.methodOn = rawData.methodOn
    this.methodName = rawData.methodName
    this.priority = rawData.priority
    this.confidental = rawData.confidental
    this.packageVersion = rawData.packageVersion
    this.panelVersion = rawData.panelVersion
    this.environment = rawData.environment
  }
}  
  
export class SelectedItems {
  panels: any[]
  serviceTypes: string[]
  constructor(rawData: { [key in string]: any }) {
    this.panels = rawData.panels
    this.serviceTypes = rawData.serviceTypes
  }
}
