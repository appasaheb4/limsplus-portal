export class MasterPanel {
    _id: string
    existsVersionId: string
    existsRecordId: string
    dateCreation: number
    dateActiveFrom: number
    dateActiveTo: number
    version: number
    keyNum: string
    enteredBy: string
    rLab: string
    pLab: string
    department: string
    section: string
    panelCode: string
    panelName: string
    description: string
    shortName: string
    bill: boolean
    price: number
    schedule: string
    tat: string
    autoRelease: boolean
    holdOOS: boolean
    validationLevel: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    confidential: boolean
    urgent: boolean
    instantResult: boolean
    reportGroup: string
    reportOrder: string
    sex: string
    sexAction: boolean
    hiAge: string
    loAge: string
    processing: "MANUAL" | "AEMI" | "AUTOMATIC" | string
    category: string
    suffix: string
    serviceType: string
    panelType: string
    repitation: boolean
    tubeGroup: string
    printLabel: boolean
    labelInstruction: string
    pageBreak: string
    method: boolean
    panelMethod: string
    workflow: string
    cumulative: boolean
    reportTemplate: string
    sampleType: string
    specalInstructions: string
    status: string
    environment: string
    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.existsVersionId = rawData.existsVersionId
        this.existsRecordId = rawData.existsRecordId
        this.dateCreation = rawData.dateCreation
        this.dateActiveFrom = rawData.dateActiveFrom
        this.dateActiveTo = rawData.dateActiveTo
        this.version = rawData.version
        this.keyNum = rawData.keyNum
        this.enteredBy = rawData.enteredBy
        this.rLab = rawData.rLab
        this.pLab = rawData.pLab
        this.department = rawData.department
        this.section = rawData.section
        this.panelCode = rawData.panelCode
        this.panelName = rawData.panelName
        this.description = rawData.description
        this.shortName = rawData.shortName
        this.bill = rawData.bill
        this.price = rawData.price
        this.schedule = rawData.schedule
        this.tat = rawData.tat
        this.autoRelease = rawData.autoRelease
        this.holdOOS = rawData.holdOOS
        this.validationLevel = rawData.validationLevel
        this.confidential = rawData.confidential
        this.urgent = rawData.urgent
        this.instantResult = rawData.instantResult
        this.reportGroup = rawData.reportGroup
        this.reportOrder = rawData.reportOrder
        this.sex = rawData.sex
        this.sexAction = rawData.sexAction
        this.hiAge = rawData.hiAge
        this.loAge = rawData.loAge
        this.method = rawData.method
        this.panelMethod = rawData.panelMethod
        this.processing = rawData.processing
        this.category = rawData.category
        this.suffix = rawData.suffix
        this.serviceType = rawData.serviceType
        this.panelType = rawData.panelType
        this.repitation = rawData.repitation
        this.tubeGroup = rawData.tubeGroup
        this.printLabel = rawData.printLabel
        this.labelInstruction = rawData.labelInstruction
        this.pageBreak = rawData.pageBreak
        this.workflow = rawData.workflow
        this.cumulative = rawData.cumulative
        this.reportTemplate = rawData.reportTemplate
        this.sampleType = rawData.sampleType
        this.specalInstructions = rawData.specalInstructions
        this.status = rawData.status
        this.serviceType = rawData.serviceType
        this.environment = rawData.environment
    }
  }
  