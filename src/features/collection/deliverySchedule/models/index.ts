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
  processingType?:
    | "Minutes"
    | "Hours"
    | "Day"
    | "Weekly"
    | "Month"
    | "Weekly"
    | "Monthly"
    | "Result"
    | "Batch1"
    | "Batch2"
  schFrequency?: string
  reportOn?: string
  dynamicRT?: string
  dynamicTU?: string
  fixedRT?: string
  onTime?: boolean
  schForDept?: string
  schForPat?: string
}
