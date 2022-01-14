export class Test {
    orderId: number
    labId: string
    patientName: string
    testId: number
    panelCode: any[]
    extraData: {
      department: string
      section: string
      methodCode: string
      methodName: string
      resultOrder: string
      prefix: string
      surfix: string
      deliverySchedule: string
      holdingDays: number
      tat: string
      worklistCode: string
      version: number
      environment: string
    }
    documentType: string
    dateOfEntry: Date
    lastUpdated: Date
  
    constructor(rawData: { [key in string]: any }) {
      this.testId = rawData.testId
      this.labId = rawData.labId
      this.patientName = rawData.patientName
      this.orderId = rawData.orderId
      this.panelCode = rawData.panelCode
      this.extraData = rawData.extraData
      this.documentType = rawData.documentType
      this.dateOfEntry = rawData.dateOfEntry
      this.lastUpdated = rawData.lastUpdated
    }
  }
  