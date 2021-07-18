export interface Department {
  _id?: string
  lab?: string
  code?: string
  name?: string
  shortName?: string
  hod?: string
  mobileNo?: string
  contactNo?: string
  autoRelease?: boolean
  requireReceveInLab?: boolean
  requireScainIn?: boolean
  routingDept?: boolean
  openingTime?: string
  closingTime?: string
  fyiLine?: string
  workLine?: string
  status?: string
}
