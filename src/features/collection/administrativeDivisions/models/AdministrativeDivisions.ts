export class AdministrativeDivisions {
    _id?: string
    country?: string
    state?: Array<string>
    district?: Array<string>   
    city?: Array<string>
    area?: Array<string>
    postalCode?: Array<string>
    sbu?: string
    zone?: string
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
    }
  }
  