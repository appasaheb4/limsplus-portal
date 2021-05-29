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
  permanent?: boolean
  vip?: boolean
}   
      
export interface PatientVisit {
  pId?: string
  labId?: string
  internalId?: string
  rLab?: string
  birthDate?: Date,
  age?: number,
  ageUnits?: string,
  dateRegistration?: Date,
  dateService?: Date,
  methodCollection?: string
  dateCollection?: Date
  collectionCenter?: string
  reportCenter?: string,
  doctorId?: string,
  doctorName?: string,
  acClass?: string,
  billTo?: string,
  invoiceAc?: string,
  reportPriority?: string,
  history?: boolean,
  status?: string,
  createdBy?: string   
}   
