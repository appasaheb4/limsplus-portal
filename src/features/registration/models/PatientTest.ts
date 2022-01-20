export class PatientTest {
    orderId: number
    labId: number
    visitId: number
    patientName: string
    testId: number
    panelCode: any[]
    panelList: any[]
    documentType: string
    dateOfEntry: Date
    lastUpdated: Date
  
    constructor(rawData: { [key in string]: any }) {
      this.testId = rawData.testId
      this.labId = rawData.labId
      this.visitId = rawData.visitId
      this.patientName = rawData.patientName
      this.orderId = rawData.orderId
      this.panelCode = rawData.panelCode
      this.panelList = rawData.panelList
      this.documentType = rawData.documentType
      this.dateOfEntry = rawData.dateOfEntry
      this.lastUpdated = rawData.lastUpdated
    }
  }
  