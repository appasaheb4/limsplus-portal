export interface PaientManger {
  internalPid?: string
  mobileNo?: string
  title?: string
  firstName?: string
  middleName?: string
  lastName?: string
  sex?: string
  address?: string
  city?: string
  state?: string
  country?: string
  postcode?: string
  email?: string
  species?: string  
  permanent?: boolean
  vip?: boolean
}

export interface PatientVisit {
  pId?: string
  labId?: string
  internalId?: string
  rLab?: string
  birthDate?: Date
  age?: number
  ageUnits?: string
  dateRegistration?: Date
  dateService?: Date
  methodCollection?: string
  dateCollection?: Date
  collectionCenter?: string
  reportCenter?: string
  doctorId?: string
  doctorName?: string
  acClass?: string
  billTo?: string
  invoiceAc?: string
  reportPriority?: string
  history?: boolean
  status?: string
  createdBy?: string
}

export interface PatientOrder {  
  labId?: string
  packageValue?: string
  panel?: string
  test?: string
  analyte?: string
  bill?: string
  containerId?: string
  sampleType?: string
  sampleId?: string
  rLab?: string
  pLab?: string
  department?: string
  section?: string
  ps?: string
  ts?: string
  as?: string
  dueDate?: Date
  comments?: string
  orderStatus?: string
}
