export class PaientManger {
    internalPid?: string
    mobileNo?: string
    title?: string
    firstName?: string
    middleName?: string
    lastName?: string
    sex?: string
    address?: string
    city?: string
    state?: string
    country?: string
    postcode?: string
    email?: string
    species?: string  
    permanent?: boolean
    vip?: boolean
    environment?: string
    constructor(rawData: {[key in string]: any}){
        this.internalPid = rawData.internalPid
        this.mobileNo = rawData.mobileNo
        this.title = rawData.title
        this.firstName = rawData.firstName
        this.middleName = rawData.middleName
        this.lastName = rawData.lastName
        this.sex = rawData.sex
        this.address = rawData.address
        this.city = rawData.city
        this.state = rawData.state
        this.country = rawData.country
        this.postcode = rawData.postcode
        this.email = rawData.email
        this.species = rawData.species
        this.permanent = rawData.permanent
        this.vip = rawData.vip
        this.environment = rawData.environment
    }
  }
  
  export class PatientVisit {
    pId?: string
    labId?: string
    internalId?: string
    rLab?: string
    birthDate?: Date
    age?: number
    ageUnits?: string
    dateRegistration?: Date
    dateService?: Date
    methodCollection?: string
    dateCollection?: Date
    collectionCenter?: string
    reportCenter?: string
    doctorId?: string
    doctorName?: string
    acClass?: string
    billTo?: string
    invoiceAc?: string
    reportPriority?: string
    history?: boolean
    status?: string
    createdBy?: string
    environment?: string
    constructor(rawData: {[key in string]: any}){
        this.pId = rawData.pId
        this.labId = rawData.labId
        this.internalId = rawData.internalId
        this.rLab = rawData.birthDate
        this.age = rawData.age
        this.ageUnits = rawData.ageUnits
        this.dateRegistration = rawData.dateRegistration
        this.dateService = rawData.dataService
        this.methodCollection = rawData.methodCollection
        this.dateCollection = rawData.dateCollection
        this.collectionCenter = rawData.collectionCenter
        this.reportCenter = rawData.reportCenter
        this.doctorId = rawData.doctorId
        this.doctorName = rawData.doctorName
        this.acClass = rawData.acClass
        this.billTo = rawData.billTo
        this.invoiceAc = rawData.invoiceAc
        this.reportPriority = rawData.reportPriority
        this.history = rawData.history
        this.status = rawData.status
        this.createdBy = rawData.createdBy
        this.environment = rawData.environment
    }
  }
  
  export class PatientOrder {  
    labId?: string
    packageValue?: string
    panel?: string
    test?: string
    analyte?: string
    bill?: string
    containerId?: string
    sampleType?: string
    sampleId?: string
    rLab?: string
    pLab?: string
    department?: string
    section?: string
    ps?: string
    ts?: string
    as?: string
    dueDate?: Date
    comments?: string
    orderStatus?: string
    environment?: string
    constructor(rawData: {[key in string]: any}){
        this.labId = rawData.labId
        this.packageValue = rawData.packageValue
        this.panel = rawData.panel
        this.test = rawData.test
        this.analyte = rawData.analyte
        this.bill = rawData.bill
        this.containerId = rawData.containerId
        this.sampleType = rawData.sampleType
        this.sampleId = rawData.sampleId
        this.rLab = rawData.rLab
        this.pLab = rawData.pLab
        this.department = rawData.department
        this.section = rawData.section
        this.ps = rawData.ps
        this.ts = rawData.ts
        this.as = rawData.as
        this.dueDate = rawData.dueDate
        this.comments = rawData.comments
        this.orderStatus = rawData.orderStatus
        this.environment = rawData.environment
    }
  }

  