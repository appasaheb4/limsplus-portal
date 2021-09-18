export class ReferenceRanges {
    existsVersionId: string
    analyteCode: string
    analyteName: string
    department: string
    species: string
    sex: string
    rangeSetOn: string
    eqType: string
    lab: string
    rangType: string
    age: number
    ageUnit: string
    low: string
    high: string
    alpha: string
    enteredBy: string
    status: string
    environment: string
    dateCreation: number
    dateActive: number
    dateExpiry: number
    version: number
    keyNum: string
    deltarang_tetype: string
    deltaInterval: string
    intervalUnit: string
    formatResultScript: string
    reportDefault: string
    constructor(rawData: {[key in string]: any}){
        this.existsVersionId = rawData.existsVersionId
        this.analyteCode = rawData.analyteCode
        this.analyteName = rawData.analyteName
        this.department = rawData.department
        this.species = rawData.species
        this.sex = rawData.sex
        this.rangeSetOn = rawData.rangeSetOn
        this.eqType = rawData.eqType
        this.lab = rawData.lab
        this.rangType = rawData.rangeType
        this.age = rawData.age
        this.ageUnit = rawData.ageUnit
        this.low = rawData.low
        this.high = rawData.high
        this.alpha = rawData.alpha
        this.enteredBy = rawData.enteredBy
        this.status = rawData.status
        this.environment = rawData.environment
        this.dateCreation = rawData.dateCreation
        this.dateActive = rawData.dateActive
        this.dateExpiry = rawData.dateExpiry
        this.version = rawData.version
        this.keyNum = rawData.keyNum
        this.deltarang_tetype = rawData.deltarang_tetype
        this.deltaInterval = rawData.deltaInterval
        this.intervalUnit = rawData.intervalUnit
        this.formatResultScript = rawData.formalResultScript
        this.reportDefault = rawData.reportDefault
    }
}