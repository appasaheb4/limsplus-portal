export interface Doctors {
  _id?: string
  existsVersionId?: string
  existsRecordId?: string
  dateCreation?: number  
  dateActiveFrom?: number  
  dateActiveTo?: number 
  version?: number
  keyNum?: string
  enteredBy?: string
  doctorCode?: string
  doctorName?: string
  sex?: string
  title?: string
  firstName?: string
  middleName?: string
  lastName?: string
  reportName?: string
  address?: string
  city?: string
  state?: string
  country?: string
  postcode?: number
  doctorType?: string
  speciality?: string
  confidential?: boolean
  salesTerritoRy?: string
  area?: string
  zone?: string
  telephone?: string
  mobileNo?: string
  email?: string
  workHours?: number
  deliveryType?: string
  deliveryMethod?: string
  edi?: string
  ediAddress?: string
  urgent?: boolean
  registrationLocation?: string
  lab?: string
  location?: string
  schedule?: string
  reportFormat?: string
  info?: string
  fyiLine?: string
  workLine?: string
  status?: string
}
