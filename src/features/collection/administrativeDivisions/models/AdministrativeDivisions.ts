export class AdministrativeDivisions {
    _id: string
    country: string
    state: string
    district: string 
    city: string
    area: string
    postalCode: Array<string>
    sbu: string
    zone: string
    environment: string
    constructor(rawData: {[key in string]: any}){
        this._id = rawData._id
        this.country = rawData.country
        this.state = rawData.state
        this.district = rawData.district
        this.city = rawData.city
        this.area = rawData.area
        this.postalCode = rawData.postalCode
        this.sbu = rawData.sbu
        this.zone = rawData.zone
        this.environment = rawData.environment
    }
  }
  