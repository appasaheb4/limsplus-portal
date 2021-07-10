export interface DeliverySchedule {
  id?: string
  schCode?: string
  sundayProcessing?: boolean
  holidayProcessing?: boolean
  sundayReporting?: boolean
  holidayReporting?: boolean
  pStartTime?: string
  pEndTime?: string
  cutofTime?: string
  secoundCutofTime?: string
  processingType?: string
  schFrequency?: string
  reportOn?: string
  dynamicRT?: string
  dynamicTU?: string
  fixedRT?: string
  onTime?: boolean
  schForDept?: string
  schForPat?: string
}
