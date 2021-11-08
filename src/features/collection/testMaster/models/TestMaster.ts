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
        this._id = rawData._id || ''
        this.existsVersionId = rawData.existsVersionId || ''
        this.existsRecordId = rawData.existsRecordId || ''
        this.dateCreation = rawData.dateCreation || ''
        this.dateActiveFrom = rawData.dateActiveFrom || ''
        this.dateActiveTo = rawData.dateActiveTo || ''
        this.version = rawData.version  || 0
        this.enteredBy = rawData.enteredBy || ''
        this.rLab = rawData.rLab || ''
        this.pLab = rawData.pLab || ''
        this.department = rawData.department || ''
        this.section = rawData.section || ''
        this.testCode = rawData.testCode || ''
        this.testName = rawData.testName || ''
        this.description = rawData.description || ''
        this.shortName = rawData.shortName || ''
        this.bill = rawData.bill || false
        this.price = rawData.price || 0
        this.schedule = rawData.schedule || ''
        this.tat = rawData.tat || ''
        this.autoFinish = rawData.autoFinish || false
        this.holdOOS = rawData.holdOOS || false
        this.validationLevel = rawData.validationLevel || 0
        this.confidential = rawData.confidential || false
        this.urgent = rawData.urgent || false
        this.instantResult = rawData.instantResult || false
        this.reportGroup = rawData.reportGroup || ''
        this.resultOrder = rawData.resultOrder || ''
        this.accredited = rawData.accredited || false
        this.cretical = rawData.cretical || false
        this.repitation= rawData.repitation  || false
        this.sampleRunOn = rawData.sampleRunOn || ''
        this.method = rawData.method || false
        this.panelMethod = rawData.panelMethod || ''
        this.speicalInstructions = rawData.speicalInstructions || ''
        this.disease = rawData.disease|| ''
        this.category = rawData.category || ''
        this.testType = rawData.testType || ''
        this.processing = rawData.processing || ''
        this.category = rawData.category || ''
        this.sufix = rawData.sufix || ''
        this.deltaHold = rawData.deltaHold || false
        this.sufix = rawData.sufix || ''
        this.prefix = rawData.prefix || ''
        this.cptCode = rawData.cptCode || ''
        this.qcHold = rawData.qcHold || false
        this.oosHold = rawData.oosHold || false
        this.workflowCode = rawData.workflowCode || ''
        this.worklistCode = rawData.worklistCode || ''
        this.repitation = rawData.repitation || ''
        this.tubeGroup = rawData.tubeGroup || ''
        this.printLabel = rawData.printLabel || ''
        this.labelInstruction = rawData.labelInstruction || ''
        this.deleverySchedule = rawData.deleverySchedule || ''
        this.workflow = rawData.workflow || ''
        this.cumulative = rawData.cumulative || false
        this.allowPartial = rawData.allowPartial || false
        this.sampleType = rawData.sampleType || ''
        this.collectionContainer = rawData.collectionContainer || ''
        this.status = rawData.status || ''
        this.holdingDays = rawData.holdingDays || ''
        this.environment = rawData.environment || ''
        this.dateOfEntry = rawData.dateOfEntry || ''
        this.lastUpdated = rawData.lastUpdated || ''
    }
  }
  