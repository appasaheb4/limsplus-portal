export class TestMaster {
    _id: string
    existsVersionId: string
    existsRecordId: string
    dateCreation: Date  
    dateActiveFrom: Date  
    dateActiveTo: Date  
    version: number
    enteredBy: string
    rLab: string
    pLab: string
    department: string
    section: Record<string, any>
    testCode: string
    testName: string
    description: string
    shortName: string
    bill: boolean
    price: number
    schedule: string
    tat: string
    autoFinish: boolean
    holdOOS: boolean
    validationLevel: number
    confidential: boolean
    urgent: boolean
    instantResult: boolean
    reportGroup: string
    resultOrder: string
    accredited: boolean
    cretical: boolean
    processing: string
    repitation: boolean
    tubeGroup: string
    printLabel: boolean
    labelInstruction: string
    method: boolean
    panelMethod: string
    sampleRunOn: string
    workflow: string
    cumulative: boolean
    sampleType: string
    speicalInstructions: string
    disease: string
    category: string  
    testType: string
    workflowCode: string
    worklistCode: string
    cptCode: string
    qcHold: boolean
    oosHold: boolean
    deltaHold: boolean
    prefix: string
    sufix: string
    deleverySchedule: string
    allowPartial: boolean
    collectionContainer: string
    holdingDays: string
    status: string
    environment: string
    dateOfEntry: Date
    lastUpdated: Date  

    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id 
        this.existsVersionId = rawData.existsVersionId 
        this.existsRecordId = rawData.existsRecordId 
        this.dateCreation = rawData.dateCreation 
        this.dateActiveFrom = rawData.dateActiveFrom 
        this.dateActiveTo = rawData.dateActiveTo 
        this.version = rawData.version  
        this.enteredBy = rawData.enteredBy 
        this.rLab = rawData.rLab 
        this.pLab = rawData.pLab 
        this.department = rawData.department 
        this.section = rawData.section 
        this.testCode = rawData.testCode 
        this.testName = rawData.testName 
        this.description = rawData.description 
        this.shortName = rawData.shortName 
        this.bill = rawData.bill 
        this.price = rawData.price 
        this.schedule = rawData.schedule 
        this.tat = rawData.tat 
        this.autoFinish = rawData.autoFinish 
        this.holdOOS = rawData.holdOOS 
        this.validationLevel = rawData.validationLevel 
        this.confidential = rawData.confidential 
        this.urgent = rawData.urgent 
        this.instantResult = rawData.instantResult 
        this.reportGroup = rawData.reportGroup 
        this.resultOrder = rawData.resultOrder 
        this.accredited = rawData.accredited 
        this.cretical = rawData.cretical 
        this.repitation= rawData.repitation  
        this.sampleRunOn = rawData.sampleRunOn 
        this.method = rawData.method 
        this.panelMethod = rawData.panelMethod 
        this.speicalInstructions = rawData.speicalInstructions 
        this.disease = rawData.disease
        this.category = rawData.category 
        this.testType = rawData.testType 
        this.processing = rawData.processing 
        this.category = rawData.category 
        this.sufix = rawData.sufix 
        this.deltaHold = rawData.deltaHold 
        this.sufix = rawData.sufix 
        this.prefix = rawData.prefix 
        this.cptCode = rawData.cptCode 
        this.qcHold = rawData.qcHold 
        this.oosHold = rawData.oosHold 
        this.workflowCode = rawData.workflowCode 
        this.worklistCode = rawData.worklistCode 
        this.repitation = rawData.repitation 
        this.tubeGroup = rawData.tubeGroup 
        this.printLabel = rawData.printLabel 
        this.labelInstruction = rawData.labelInstruction 
        this.deleverySchedule = rawData.deleverySchedule 
        this.workflow = rawData.workflow 
        this.cumulative = rawData.cumulative 
        this.allowPartial = rawData.allowPartial 
        this.sampleType = rawData.sampleType 
        this.collectionContainer = rawData.collectionContainer 
        this.status = rawData.status 
        this.holdingDays = rawData.holdingDays 
        this.environment = rawData.environment 
        this.dateOfEntry = rawData.dateOfEntry 
        this.lastUpdated = rawData.lastUpdated 
    }
  }
  