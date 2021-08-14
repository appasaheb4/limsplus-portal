export class TestSampleMapping {
    _id?: string
    testCode?: string   
    sampleCode?: string
    sampleType?: string
    sampleGroup?: string
    collContainerCode?: string
    collContainerName?: string
    testContainerCode?: string
    testContainerName?: string
    primaryContainer?: boolean
    uniqueContainer?: boolean
    centerIfuge?: boolean
    aliquot?: boolean
    labSpecfic?: boolean
    departmentSpecfic?: boolean
    sharedSample?: boolean
    minDrawVol?: string
    minDrawVolUnit?: string
    minTestVol?: string
    minTestVolUnit?: string
    condition?: string
    repentionPeriod?: string
    repentionUnits?: string
    labelInst?: string
    printLabels?: boolean
    info?: string
    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.testCode = rawData.testCode
        this.sampleCode = rawData.sampleCode
        this.sampleType = rawData.sampleType
        this.sampleGroup = rawData.sampleGroup
        this.collContainerCode = rawData.collContainerCode
        this.collContainerName = rawData.collContainerName
        this.testContainerCode = rawData.testContainerCode
        this.testContainerName = rawData.testContainerName
        this.primaryContainer = rawData.primaryContainer
        this.uniqueContainer = rawData.uniqueContainer
        this.centerIfuge = rawData.centerIfuge
        this.aliquot = rawData.aliquot
        this.labSpecfic = rawData.labSpecfic
        this.departmentSpecfic = rawData.departmentSpecfic
        this.sharedSample = rawData.sharedSample
        this.minDrawVol = rawData.minDrawVol
        this.minDrawVolUnit = rawData.minDrawVolUnit
        this.minTestVol = rawData.minTestVol
        this.minTestVolUnit = rawData.minTestVolUnit
        this.condition = rawData.condition
        this.repentionPeriod = rawData.repentionPeriod
        this.repentionUnits = rawData.repentionUnits
        this.labelInst = rawData.labelInst
        this.printLabels = rawData.printLabels
        this.info = rawData.info
        
    }
  }
  