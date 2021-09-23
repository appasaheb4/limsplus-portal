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

  