export interface MasterPackage {
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
}
