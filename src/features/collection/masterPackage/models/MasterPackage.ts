export class MasterPackage {
    existsVersionId?: string
    existsRecordId?: string
    dateCreation?: number  
    dateActiveFrom?: number  
    dateActiveTo?: number 
    version?: number    
    keyNum?: string
    enteredBy?: string
    lab?: string  
    packageCode?: string
    packageName?: string
    panelCode?: string[]
    panelName?: string[]
    bill?: boolean
    status?: string
    serviceType?: string
    environment?: string
    constructor(rawData: {[key in string]: any}){
        this.existsVersionId = rawData.existsVersionId
        this.existsRecordId = rawData.existsRecordId
        this.dateCreation = rawData.dateCreation
        this.dateActiveFrom = rawData.dateActiveFrom
        this.dateActiveTo = rawData.dateActiveTo
        this.version = rawData.version
        this.keyNum = rawData.keyNum
        this.enteredBy = rawData.enteredBy
        this.lab = rawData.lab
        this.packageCode = rawData.packageCode
        this.packageName = rawData.packageName
        this.panelCode = rawData.panelCode
        this.panelName = rawData.panelName
        this.bill = rawData.bill
        this.status = rawData.status
        this.serviceType = rawData.serviceType
        this.environment = rawData.environment
    }
  }
  