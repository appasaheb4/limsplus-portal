export class PatientManger {
    pId?: string
    mobileNo?: string
    birthDate?: Date
    title?: string
    firstName?: string
    middleName?: string
    lastName?: string
    sex?: string
    species?: string
    breed?: string
    usualDoctor?: string
    history?: boolean
    address?: string
    postcode?: string
    city?: string
    state?: string
    country?: string
    email?: string  
    isMobileAndWhatsApp?: boolean
    whatsappNumber?: string
    permanent?: boolean
    vip?: boolean
    confidental?: boolean
    photograph?: string
    signature?: string
    bloodGroup?: string
    height?: string
    weight?: string
    followUp?: string
    comments?: string
    fyiLine?: string
    balance?: string
    accountType?: string
    enteredBy?: string
    status?: string
    environment?: string
    constructor(rawData: {[key in string]: any}){
        this.pId = rawData.pId
        this.mobileNo = rawData.mobileNo
        this.birthDate = rawData.birthDate
        this.title = rawData.title
        this.firstName = rawData.firstName
        this.middleName = rawData.middleName
        this.lastName = rawData.lastName
        this.sex = rawData.sex
        this.species = rawData.species
        this.breed = rawData.breed
        this.usualDoctor = rawData.usualDoctor
        this.history = rawData.history
        this.address = rawData.address
        this.postcode = rawData.postcode
        this.city = rawData.city
        this.state = rawData.state
        this.country = rawData.country
        this.email = rawData.email
        this.isMobileAndWhatsApp = rawData.isMobileAndWhatsApp
        this.whatsappNumber = rawData.whatsappNumber
        this.permanent = rawData.permanent
        this.vip = rawData.vip
        this.confidental = rawData.confidental
        this.photograph = rawData.photograph
        this.signature = rawData.signature
        this.bloodGroup = rawData.bloodGroup
        this.height = rawData.height
        this.weight =  rawData.weight
        this.followUp = rawData.followUp
        this.comments = rawData.comments
        this.fyiLine = rawData.fyiLine
        this.balance = rawData.balance
        this.accountType = rawData.accountType
        this.enteredBy = rawData.enteredBy
        this.status = rawData.status
        this.environment = rawData.environment
    }
  }
  
  export class PatientVisit {
    patient?: string
    rLab?: string 
    visitId?: string
    visitDate?: Date
    registrationDate?: Date
    collectionDate?: Date
    dueDate?: Date
    birthDate?: Date
    age?: number
    ageUnits?: string
    collectionCenter?: string
    billTo?: string
    acClass?: string
    doctorId?: string
    doctorName?: string
    deliveryType?: string
    history?: boolean
    status?: string
    additionalInfo?: string
    invoiceAc?: string
    billingMethod?: string
    billNumber?: string
    urgent?: boolean
    confidental?: boolean
    autoNumber?: string
    methodCollection?: string
    collectedBy?: string
    pendingDataEntry?: boolean
    receivedDate?: Date
    resultDate?: Date
    approvalDate?: Date
    approvalStatus?: string
    reportStatus?: string
    reportedDate?: Date
    enteredBy?: string
    gestation?: string
    height?: string
    weight?: string
    archieve?: string
    loginInterface?: string
    submittedSystem?: string
    submittedOn?: string
    balance?: string
    environment?: string  
    constructor(rawData: {[key in string]: any}){
      this.patient = rawData.patient
      this.rLab = rawData.rLab
      this.visitId = rawData.visitId
      this.visitDate = rawData.visitDate
      this.registrationDate = rawData.registrationDate
      this.collectionDate = rawData.collectionDate
      this.dueDate = rawData.dueDate
      this.birthDate = rawData.birthDate
      this.age = rawData.age
      this.ageUnits = rawData.ageUnits
      this.collectionCenter = rawData.collectionCenter
      this.billTo = rawData.billTo
      this.acClass = rawData.acClass
      this.doctorId = rawData.doctorId
      this.doctorName = rawData.doctorName
      this.deliveryType = rawData.deliveryType
      this.history = rawData.history
      this.status = rawData.status
      this.additionalInfo = rawData.additionalInfo
      this.invoiceAc = rawData.invoiceAc
      this.billingMethod = rawData.billingMethod
      this.billNumber = rawData.billNumber
      this.urgent = rawData.urgent
      this.confidental = rawData.confidental
      this.autoNumber = rawData.autoNumber
      this.methodCollection = rawData.methodCollection
      this.collectedBy = rawData.collectedBy
      this.pendingDataEntry = rawData.pendingDataEntry
      this.receivedDate = rawData.receivedDate
      this.resultDate = rawData.resultDate
      this.approvalDate = rawData.approvalDate
      this.approvalStatus = rawData.approvalStatus
      this.reportStatus = rawData.reportStatus
      this.reportedDate = rawData.reportedDate
      this.enteredBy = rawData.enteredBy
      this.gestation = rawData.gestation
      this.height = rawData.height
      this.weight = rawData.weight
      this.archieve = rawData.archieve
      this.loginInterface = rawData.loginInterface
      this.submittedSystem = rawData.submittedSystem      
      this.submittedOn = rawData.submittedOn
      this.balance = rawData.balance
      this.environment = rawData.environment
    }
  }
  
  export class PatientOrder { 
    visitId?: string
    packageCode?: string
    packageName?: string
    panelCode?: string
    panelName?: string
    bill?: string
    serviceType?: string
    department?: string
    section?: string
    rLab?: string
    pLab?: string
    outSourceLab?: string
    currentDepartment?: string
    dueDate?: Date
    resultDate?: Date
    status?: string
    comments?: string
    forceOutSource?: boolean
    osStatus?: string
    osReceivedDate?: string
    osReceivedBy?: string
    autoRelease?: boolean
    abNormal?: boolean
    critical?: boolean
    reTest?: string
    reRun?: string
    qty?: string
    rep?: string
    instrumentType?: string
    instrumentId?: string
    methodOn?: string
    methodName?: string
    priority?: string
    confidental?: boolean
    packageVersion?: string
    panelVersion?: string
    environment?: string
    // dilitionValue?: string
    // workFlow?: string
    // loginServgrp?: string
    // collectionDate?: Date
    // collectedBy?: string
    // collectedUnits?: string
    // lastUpdated?: string
    // orderStatus?: string
    // sampleCondition?: string
    // currentServgrp?: string
    // routingStatus?: string
    // pu?: string
    // recvTime?: Date
    // printLabel?: boolean
    // srascanin?: string
    // outSourceOrderNo?: string
    // departmentOutsource?: string
    // sampDesc?: string
    // amoumtGross?: string
    // amoumtNet?: string
    // amountDiscount?: string
    // discountInPercentage?: string
    
    constructor(rawData: {[key in string]: any}){
      this.visitId = rawData.visitId
      this.packageCode = rawData.packageCode
      this.packageName = rawData.packageName
      this.panelCode = rawData.panelCode
      this.panelName = rawData.panelName
      this.bill = rawData.bill
      this.serviceType = rawData.serviceType
      this.department = rawData.department
      this.section = rawData.section
      this.rLab = rawData.rLab
      this.pLab = rawData.pLab
      this.outSourceLab = rawData.outSourceLab
      this.currentDepartment = rawData.currentDepartment
      this.dueDate = rawData.dueDate
      this.resultDate = rawData.resultDate
      this.status = rawData.status
      this.comments = rawData.comments
      this.forceOutSource = rawData.forceOutSource
      this.osReceivedBy = rawData.osReceivedBy
      this.autoRelease = rawData.autoRelease
      this.abNormal = rawData.abNormal
      this.critical = rawData.critical
      this.reTest = rawData.reTest
      this.reRun = rawData.reRun
      this.qty = rawData.qty
      this.rep = rawData.rep
      // this.eqId = rawData.eqId
      // this.eqType = rawData.eqType
      this.methodOn = rawData.methodOn
      this.methodName = rawData.methodName
      this.osStatus = rawData.osStatus
      this.priority = rawData.priority
      // this.pOrder = rawData.pOrder
      // this.aOrder = rawData.aOrder
      this.confidental = rawData.confidental
      // this.dilitionValue = rawData.dilitionValue
      // this.workFlow = rawData.workFlow
      // this.loginServgrp = rawData.loginServgrp
      // this.collectionDate = rawData.collectionDate
      // this.collectedBy = rawData.collectedBy
      // this.collectedUnits = rawData.collectedUnits
      // this.lastUpdated = rawData.lastUpdated
      // this.orderStatus = rawData.orderStatus
      // this.sampleCondition = rawData.sampleCondition
      // this.currentServgrp = rawData.currentServgrp
      // this.routingStatus = rawData.routingStatus
      // this.pu = rawData.pu
      // this.recvTime = rawData.recvTime
      // this.printLabel = rawData.printLabel
      // this.srascanin = rawData.srascanin
      // this.outSourceOrderNo = rawData.outSourceOrderNo
      // this.departmentOutsource = rawData.departmentOutsource
      // this.sampDesc = rawData.sampDesc
      // this.amoumtGross = rawData.amountGross
      // this.amoumtNet = rawData.amoumtNet
      // this.amountDiscount = rawData.amountDiscount
      // this.discountInPercentage = rawData.discountInPercentage
      this.environment = rawData.environment
        
    }
  }

export class InformationGroup {
  infoDate?: Date
  infoRelatedTo?: string
  keyField?: string
  infoType?: string
  infoLookup?: boolean
  lookupValue?: string
  information?: string
  attachment?: string
  environment?: string
  enteredBy?: string
  status?: string
  constructor(rawData: {[key in string]: any}){
      this.infoDate = rawData.infoDate
      this.infoRelatedTo = rawData.infoRelatedTo
      this.keyField = rawData.keyField
      this.infoType = rawData.infoType
      this.infoLookup = rawData.infoLookup
      this.lookupValue = rawData.lookupValue
      this.information = rawData.information
      this.attachment = rawData.attachment
      this.environment = rawData.environment
      this.enteredBy = rawData.enteredBy
      this.status = rawData.status
  }
}
  
export class PatientSample {
  specimenId?: string
  pLab?: string
  rLab?: string
  outSourceLab?: string
  outSourceStatus?: string
  department?: string
  section?: string
  containerId?: string
  sampleType?: string
  receivedDate?: Date
  collectionDate?: Date
  methodCollection?: string
  dateCollection?: Date
  collectedBy?: string
  panelList?: string
  dueDate?: string
  status?: string
  environment?: string
  constructor(rawData: {[key in string]: any}){
    this.specimenId = rawData.specimenId
    this.pLab = rawData.pLab
    this.rLab = rawData.rLab
    this.outSourceLab = rawData.outSourceLab
    this.outSourceStatus = rawData.outSourceStatus
    this.department = rawData.department
    this.section = rawData.section
    this.containerId = rawData.containerId
    this.sampleType = rawData.sampleType
    this.receivedDate = rawData.receivedDate
    this.collectionDate = rawData.collectionDate
    this.methodCollection = rawData.methodCollection
    this.dateCollection = rawData.dateCollection
    this.collectedBy = rawData.collectedBy
    this.panelList = rawData.panelList
    this.dueDate = rawData.dueDate
    this.status = rawData.status
    this.environment = rawData.environment
  }
}

export class PatientResult{
  patientOrder?: string
  visitId?: string
  pLab?: string
  testCode?: string
  testName?: string
  sorter?: string
  analyteCode?: string
  analyteName?: string
  department?: string
  section?: string
  resultType?: string
  rawValue?: string
  alpha?: string
  value?: string
  result?: string
  units?: string
  resultDate?: Date
  releaseDate?: Date
  abNormal?: boolean
  critical?: boolean
  hold?: boolean
  status?: string
  enteredBy?: string
  analyteType?: string
  picture?: string
  testVersion?: string
  analyteVersion?: string
  calcFlag?: boolean
  calciName?: string
  calculation?: string
  formula?: string
  reTest?: boolean
  reRun?: boolean
  dilutionValue?: string
  repitation?: string
  instrumentType?: string
  instrumentId?: string
  instrumentResult?: string
  analyzedDate?: Date
  instrumentUnit?: string
  confidental?: boolean
  workFlow?: boolean
  attachment?: boolean
  lonicCode?: string
  price?: string
  resultReportable?: boolean
  rangeReportable?: boolean
  pLaterUnno?: string
  runno?: string
  cupno?: string
  species?: string
  deltaFlag?: string
  deltaValue?: string
  qcFlag?: string
  qcStatus?: string
  byPassEln?: string
  color?: string
  environment?: string
  constructor(rawData: {[key in string]: any}){
    this.patientOrder = rawData.patientOrder
    this.visitId = rawData.visitId
    this.pLab = rawData.pLab
    this.testCode = rawData.testCode
    this.testName = rawData.testName
    this.sorter = rawData.sorter
    this.analyteCode = rawData.analyteCode
    this.analyteName = rawData.analyteName
    this.department = rawData.department
    this.section = rawData.section
    this.resultType = rawData.resultType
    this.rawValue = rawData.rawValue
    this.alpha = rawData.alpha
    this.value = rawData.value
    this.result = rawData.result
    this.units = rawData.units
    this.resultDate = rawData.resultDate
    this.releaseDate = rawData.releaseDate
    this.abNormal = rawData.abNormal
    this.critical = rawData.critical
    this.hold = rawData.hold
    this.status = rawData.status
    this.enteredBy = rawData.enteredBy
    this.analyteType = rawData.analyteType
    this.picture = rawData.picture
    this.testVersion = rawData.testVersion
    this.analyteVersion = rawData.analyteVersion
    this.calcFlag = rawData.calcFlag
    this.calciName  = rawData.calciName
    this.calculation = rawData.calculation
    this.formula = rawData.formula
    this.reTest = rawData.reTest
    this.reRun = rawData.reRun
    this.dilutionValue = rawData.dilutionValue
    this.repitation = rawData.repitation
    this.instrumentType = rawData.instrumentType
    this.instrumentId = rawData.instrumentId
    this.instrumentResult = rawData.instrumentResult
    this.analyzedDate = rawData.analyzedDate
    this.instrumentUnit = rawData.instrumentUnit
    this.confidental = rawData.confidental
    this.workFlow = rawData.workFlow
    this.attachment = rawData.attachment
    this.lonicCode = rawData.lonicCode
    this.price = rawData.price
    this.resultReportable = rawData.resultReportable
    this.rangeReportable = rawData.rangeReportable
    this.pLaterUnno = rawData.pLaterUnno
    this.runno = rawData.runno
    this.cupno = rawData.cupno
    this.species =  rawData.species
    this.deltaFlag = rawData.deltaFlag
    this.deltaValue = rawData.deltaValue
    this.qcFlag  = rawData.qcFlag
    this.qcStatus = rawData.qcStatus
    this.byPassEln = rawData.byPassEln
    this.color = rawData.color
    this.environment = rawData.environment
  }
}

export class SpecialResult {
  visitId?: string
  patientResult?: string
  analyteCode?: string
  resultType?: string
  lineNo?: string
  resultTest?: string
  ruler?: string
  abNormal?: boolean
  enteredBy?: string
  environment?: string
  constructor(rawData: {[key in string]: any}){
    this.visitId = rawData.visitID
    this.patientResult = rawData.patientResult
    this.analyteCode = rawData.analyteCode
    this.resultType = rawData.resultType
    this.lineNo = rawData.lineNo
    this.resultTest = rawData.resultTest
    this.ruler = rawData.ruler
    this.abNormal = rawData.abNormal
    this.enteredBy = rawData.enteredBy
    this.environment = rawData.environment
  }
}